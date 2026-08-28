const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      "For the table generator to work, it must be provided an array with the columns, a Data array and the correct Id of the table element on the html file",
    );
  }
  const tableElement = document.getElementById(tableId);

  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error(
      "The provided Id is invalid or doesn't correspond to a table element",
    );
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  function createTheadElement(tableReference) {
    const theadElement = document.createElement("thead");
    tableReference.appendChild(theadElement);
    return theadElement;
  }
  const tableHeadReference =
    tableReference.querySelector("thead") ?? createTheadElement(tableReference);
  const headerRow = document.createElement("tr");
  for (const tableColumnObject of columnsArray) {
    const headerElement = /*html*/ `<th class="text-center">${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHeadReference.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbodyElement = document.createElement("tbody");
    tableReference.appendChild(tbodyElement);
    return tbodyElement;
  }
  const tableBodyReference =
    tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement("tr");
    for (const tableColumn of columnsArray) {
        const formatFunction = tableColumn.format ?? ((numberInfo)=>numberInfo);
      tableRow.innerHTML += /*html*/ `<td class="text-center">${formatFunction(tableItem[tableColumn.accessor])}</td>`;
    }
    tableBodyReference.appendChild(tableRow);
  }

}
