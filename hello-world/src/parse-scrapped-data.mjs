export default function parsedata(scrappedData) {
    const data = JSON.parse(scrappedData);

    const companyInfo = {
        companyName: data.companyName,
        cnpj: data.cnpj,
        inscricaoEstadual: data.inscricaoEstadual,
        address: data.address,
        totalItems: data.summary.totalItems,
        totalValue: data.summary.totalValue,
        valuePaid: data.summary.valuePaid,
        paymentMethod: data.summary.paymentMethod
    };

    const products = data.products.map(product => ({
        companyName: data.companyName,
        product: product.product,
        code: product.code,
        quantity: product.quantity,
        unit: product.unit,
        totalValue: product.totalValue
    }));

    return { companyInfo, products };
}