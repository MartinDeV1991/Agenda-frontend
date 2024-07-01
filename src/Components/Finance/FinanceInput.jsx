
import React, { useState } from 'react';
import { postFinanceAPI } from '../../Util/fetch';

import data from '../../Data/finance-data.json';
const FinanceInput = ({ setFetchedData }) => {
    const [date, setDate] = useState("");
    const [account1, setAccount1] = useState(0);
    const [account2, setAccount2] = useState(0);
    const [account3, setAccount3] = useState(0);

    return (
        <div>
            Finance Input
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                <div>Date
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>Account1
                    <input type="number" value={account1} onChange={(e) => setAccount1(e.target.value)} />
                </div>
                <div>Account2
                    <input type="number" value={account2} onChange={(e) => setAccount2(e.target.value)} />
                </div>
                <div>Account3
                    <input type="number" value={account3} onChange={(e) => setAccount3(e.target.value)} />
                </div>

                <div>
                    <button
                        onClick={() => {
                            const newRow = {
                                date: date,
                                account_Account1: Number(account1),
                                account_Account2: Number(account2),
                                account_Account3: Number(account3)
                            }
                            postFinanceAPI(newRow, setFetchedData)
                        }}>
                        Add
                    </button>

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