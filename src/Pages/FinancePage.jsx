
import FinanceInput from '../Components/Finance/FinanceInput';
import FinanceTable from '../Components/Finance/FinanceTable';
import FinanceGraph from '../Components/Finance/FinanceGraph';

import { useEffect, useState } from 'react';
import { dummyData } from '../Components/Finance/AccountDummyData';

import { fetchFinanceAPI, fetchMappingAPI, postFinanceAPI } from '../Util/fetch';

const FinancePage = () => {

    const [fetchedData, setFetchedData] = useState([]);
    const [data, setData] = useState([]);
    const [mapping, setMapping] = useState([]);

    useEffect(() => {
        fetchFinanceAPI(setFetchedData);
        fetchMappingAPI(setMapping);
    }, []);


    const calcTotals = (dataObject) => {
        const numericalColumns = Object.keys(dataObject[0]).filter(key => key.startsWith('account'));
        const dataWithTotals = dataObject.map(item => {
            const total = numericalColumns.reduce((sum, column) => sum + parseFloat(item[column] || 0), 0);
            return { ...item, total };
        });
        return dataWithTotals;
    }

    const calcDifferences = (dataObject) => {
        const dataWithDifferences = dataObject.map((item, index) => {
            const previousItem = index > 0 ? dataObject[index - 1] : null;
            const difference = previousItem ? item.total - previousItem.total : null;
            return { ...item, difference };
        });
        return dataWithDifferences;
    }

    function convertAccountNames(dataArray, mapping) {
        let convertedArray = dataArray.map(obj => {
            let newObj = {};
            Object.keys(obj).forEach(key => {
                if (key in mapping) {
                    newObj[mapping[key]] = obj[key];
                } else {
                    newObj[key] = obj[key];
                }
            });
            return newObj;
        });

        return convertedArray;
    }

    useEffect(() => {
        if (fetchedData.length > 0) {
            const dataObject = fetchedData.map(item => ({ ...item }));
            const dataWithTotals = calcTotals(dataObject);
            dataWithTotals.sort((a, b) => new Date(a.date) - new Date(b.date));
            const dataWithTotalsAndDifferences = calcDifferences(dataWithTotals)
            let convertedDataArray = convertAccountNames(dataWithTotalsAndDifferences, mapping[0].mapping);
            setData(convertedDataArray);
        }
    }, [fetchedData, mapping]);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <FinanceInput fetchedData={fetchedData} setFetchedData={setFetchedData} mapping={mapping} convertAccountNames={convertAccountNames} />
                <FinanceGraph data={data} />
            </div>
            <FinanceTable data={data} setFetchedData={setFetchedData} />

        </div>
    )
}

export default FinancePage;