import { stringify } from "csv-stringify";
import fs from "fs";

const generateCSV = (data: any) => {

    try {

        const writableStream = fs.createWriteStream('report.csv')

        const stringifier = stringify(data, {
            header: true,
            columns: [
                'id',
                'name',
                'tribe',
                'organization',
                'status',
                'state',
                'coverage',
                'code_smells',
                'bugs',
                'vulnerabilities',
                'hotspot',
            ]
        })

        data.forEach((row: any) => {
            stringifier.write(row)
        })

        stringifier.pipe(writableStream)
    }

    catch (e) {
        console.log(e)
    }
}

export default generateCSV