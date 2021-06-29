export const FRECUENCY_TABLE_NAME = "frecuency-table";
export const DESCRIPTOR_TABLE_NAME = "descriptor-table";

export function showDescriptorTable(data) {
  addTitle("Tabla de descriptores", Object.keys(data).length);

  const body = document.getElementsByTagName("body")[0];
  const table = document.createElement("table");
  table.id = DESCRIPTOR_TABLE_NAME;
  const tableBody = document.createElement("tbody");
  const rowHeader = document.createElement("tr");
  const columnNames = ["Id", "Descriptor"];

  columnNames.forEach((columnName) => {
    const cell = document.createElement("td");
    const cellText = document.createTextNode(columnName);
    cell.appendChild(cellText);
    rowHeader.appendChild(cell);
  });

  tableBody.appendChild(rowHeader);
  let id = 0;
  data.forEach((value) => {
    const row = document.createElement("tr");
    id++;
    columnNames.forEach((columnName) => {
      const cell = document.createElement("td");
      const cellText =
        columnName === "Id"
          ? document.createTextNode(id)
          : document.createTextNode(value);
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
  const columnNames = ["Source", "Target", "Count"];

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

function addTitle(title, total) {
  const tableTitle = document.createElement("h2");
  tableTitle.innerHTML = `<h2>${title} <font color="green">${total}</font></h2>`;
  document.body.appendChild(tableTitle);
}
