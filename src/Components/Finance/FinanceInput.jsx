
import React, { useEffect, useState } from 'react';
import { postFinanceAPI } from '../../Util/fetch';

import data from '../../Data/finance-data.json';
const FinanceInput = ({ fetchedData, setFetchedData, mapping, convertAccountNames }) => {

    const [date, setDate] = useState("");
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (fetchedData.length > 0 && mapping.length > 0) {
            let newObjArray = [];
            const firstObj = fetchedData[0];
            Object.keys(firstObj).forEach(key => {
                if (key in mapping[0].mapping) {
                    newObjArray.push({ name: mapping[0].mapping[key].substring(8), value: 0 });
                }
            });
            setAccounts(newObjArray);
        } else {
            setAccounts([
                { name: 'Account1', value: 0 },
                { name: 'Account2', value: 0 },
                { name: 'Account3', value: 0 }
            ]);
        }
    }, [fetchedData, mapping]);

    const handleAccountChange = (index, field, value) => {
        const newAccounts = [...accounts];
        newAccounts[index][field] = value;
        setAccounts(newAccounts);
    };

    const handleAddRow = () => {
        const newRow = {
            date: date,
            ...accounts.reduce((acc, account) => {
                acc[`account_${account.name}`] = Number(account.value);
                return acc;
            }, {})
        };
        console.log(newRow);
        postFinanceAPI(newRow, setFetchedData);
    };

    const addAccount = () => {
        setAccounts([...accounts, { name: `Account${accounts.length + 1}`, value: 0 }]);
    };

    const removeAccount = (index) => {
        setAccounts(accounts.filter((_, i) => i !== index));
    };

    const openInput = (index, change) => {
        const newAccounts = [...accounts];
        newAccounts[index].change = change;
        setAccounts(newAccounts);
    }

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                <div>Date
                    <input type="date" value={date} onChange={handleDateChange} />
                </div>
                {accounts.map((account, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        {!account.change && <div
                            onDoubleClick={() => openInput(index, true)}
                            style={{ marginRight: '10px', width: '200px', cursor: 'pointer' }}
                        >
                            {account.name}
                        </div>
                        }
                        {account.change && <input
                            type="text"
                            placeholder="Account Name"
                            value={account.name}
                            onChange={(e) => handleAccountChange(index, 'name', e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && openInput(index, false)}
                            style={{ marginRight: '10px' }}
                        />
                        }
                        <input
                            type="number"
                            placeholder="Account Value"
                            value={account.value}
                            onChange={(e) => handleAccountChange(index, 'value', e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <button onClick={() => removeAccount(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={addAccount}>Add Account</button>

                <div>
                    <button onClick={handleAddRow}>Add</button>
                    <button
                        onClick={() => {
                            data.forEach(row => {
                                postFinanceAPI(row, setFetchedData)
                            });
                        }}>Add from file</button>
                </div>
            </div>
        </div>
    )
}

export default FinanceInput;