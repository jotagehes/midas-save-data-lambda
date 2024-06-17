import parseScrappedData from "./src/parse-scrapped-data.mjs";

export const lambdaHandler = async (event, context) => {
    let messageBody;
    const record = event.Records[0];
    if (record) {
        messageBody = JSON.parse(record.body).Message;
    }
    parseScrappedData(messageBody);
};