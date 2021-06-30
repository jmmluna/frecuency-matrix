export const FRECUENCY_TABLE_NAME = "frecuency-table";
export const DESCRIPTOR_TABLE_NAME = "descriptor-table";
export const DESCRIPTOR_ID_TABLE_NAME = "descriptor-id-table";

export function showDescriptorTable(obj) {
    const data = obj.orderedDescriptorList;
    const typified = obj.typifiedDescriptorList;

    addTitle("Tabla de descriptores", Object.keys(data).length);

    const body = document.getElementsByTagName("body")[0];
    const table = document.createElement("table");
    table.id = DESCRIPTOR_TABLE_NAME;
    const tableBody = document.createElement("tbody");
    const rowHeader = document.createElement("tr");
    const columnNames = ["Id", "Label"];

    columnNames.forEach((columnName) => {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(columnName);
        cell.appendChild(cellText);
        rowHeader.appendChild(cell);
    });

    tableBody.appendChild(rowHeader);
    //   let id = 0;
    data.forEach((value) => {
        const row = document.createElement("tr");
        // id++;
        columnNames.forEach((columnName) => {
            const cell = document.createElement("td");
            const cellText =
                columnName === "Id" ?
                document.createTextNode(typified[value]) :
                document.createTextNode(value);
            cell.appendChild(cellText);
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    body.appendChild(table);
    table.setAttribute("border", "2");
}

export function showFrequencyTable(data) {
    addTitle("Tabla de frecuencias de relaciones", Object.keys(data).length);

    const body = document.getElementsByTagName("body")[0];
    const table = document.createElement("table");
    table.id = FRECUENCY_TABLE_NAME;
    const tableBody = document.createElement("tbody");
    const rowHeader = document.createElement("tr");
    const columnNames = ["Source", "Target", "Weight", "Label", "Type"];

    columnNames.forEach((columnName) => {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(columnName);
        cell.appendChild(cellText);
        rowHeader.appendChild(cell);
    });

    tableBody.appendChild(rowHeader);

    Object.keys(data).forEach((key) => {
        const row = document.createElement("tr");

        columnNames.forEach((columnName) => {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(
                data[key][columnName.toLowerCase()]
            );
            cell.appendChild(cellText);
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    body.appendChild(table);
    table.setAttribute("border", "2");
}

export function showFrequencyTableWithId(data, typifiedDescriptorList) {
    addTitle(
        "Tabla de frecuencias de relaciones con IDs",
        Object.keys(data).length
    );

    const body = document.getElementsByTagName("body")[0];
    const table = document.createElement("table");
    table.id = DESCRIPTOR_ID_TABLE_NAME;
    const tableBody = document.createElement("tbody");
    const rowHeader = document.createElement("tr");
    const columnNames = ["Source", "Target", "Weight", "Label", "Type"];

    columnNames.forEach((columnName) => {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(columnName);
        cell.appendChild(cellText);
        rowHeader.appendChild(cell);
    });

    tableBody.appendChild(rowHeader);

    Object.keys(data).forEach((key) => {
        const row = document.createElement("tr");

        columnNames.forEach((columnName) => {
            const cell = document.createElement("td");
            const value = data[key][columnName.toLowerCase()];
            const cellText = document.createTextNode(
                columnName === "Source" || columnName === "Target" ?
                typifiedDescriptorList[value] :
                value
            );
            cell.appendChild(cellText);
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    body.appendChild(table);
    table.setAttribute("border", "2");
}

function addTitle(title, total) {
    const tableTitle = document.createElement("h2");
    tableTitle.innerHTML = `<h2>${title} <font color="green">${total}</font></h2>`;
    document.body.appendChild(tableTitle);
}