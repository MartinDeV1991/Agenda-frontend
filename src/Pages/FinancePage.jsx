
import FinanceInput from '../Components/Finance/FinanceInput';
import FinanceTable from '../Components/Finance/FinanceTable';
import FinanceGraph from '../Components/Finance/FinanceGraph';

import { useEffect, useState } from 'react';
import { dummyData } from '../Components/Finance/AccountDummyData';

import { fetchFinanceAPI } from '../Util/fetch';

const FinancePage = () => {

    const [fetchedData, setFetchedData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // if (dummyData.length > 0) {
        //     const dataObject = dummyData.map(item => ({
        //         ...item
        //     }));

        //     const numericalColumns = Object.keys(dummyData[0]).filter(key => key.startsWith('account'));
        //     const dataWithTotals = dataObject.map(item => {
        //         const total = numericalColumns.reduce((sum, column) => sum + parseFloat(item[column] || 0), 0);
        //         return { ...item, total };
        //     });

        //     setData(dataWithTotals);
        // }

        fetchFinanceAPI(setFetchedData);
    }, []);

    useEffect(() => {
        if (fetchedData.length > 0) {
            const dataObject = fetchedData.map(item => ({
                ...item
            }));

            const numericalColumns = Object.keys(fetchedData[0]).filter(key => key.startsWith('account'));
            const dataWithTotals = dataObject.map(item => {
                const total = numericalColumns.reduce((sum, column) => sum + parseFloat(item[column] || 0), 0);
                return { ...item, total };
            });

            dataWithTotals.sort((a, b) => new Date(a.date) - new Date(b.date));
            setData(dataWithTotals);
        }
    }, [fetchedData]);


    return (
        <div>
            Finance Page
            <FinanceInput setFetchedData={setFetchedData} />
            <FinanceGraph data={data} />
            <FinanceTable data={data} setFetchedData={setFetchedData} />

        </div>
    )
}

export default FinancePage;