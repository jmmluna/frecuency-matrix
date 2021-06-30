import xlsxParser from "xlsx-parse-json";
import "./style.css";
import HtmlToXlsxCreator from "./HtmlToXlsxCreator";
import {
    showDescriptorTable,
    DESCRIPTOR_TABLE_NAME,
    showFrequencyTable,
    showFrequencyTableWithId,
    FRECUENCY_TABLE_NAME,
} from "./TableGenerator";

document.getElementById("imputFile").onchange = async(evt) => {
    const files = Array.from(evt.target.files);
    const data = await xlsxParser.onFileSelection(files[0]);
    const sheetName = Object.keys(data)[0];
    const sheet = data[sheetName];
    const descriptorList = createDescriptorList(sheet);
    showDescriptorTable(descriptorList);

    const relations = createRelations(
        descriptorList.orderedDescriptorList,
        sheet
    );
    const counter = await relationshipCounter(
        descriptorList.orderedDescriptorList,
        relations
    );

    showFrequencyTable(counter);
    showFrequencyTableWithId(counter, descriptorList.typifiedDescriptorList);

    const dowloadButton = document.getElementById("download");
    dowloadButton.disabled = false;
    dowloadButton.onclick = () => {
        const tables = document.getElementsByTagName("table");
        const sheets = [];
        const sheetNames = [];

        for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
            sheets.push(tables[tableIndex].id);
            sheetNames.push(String(tables[tableIndex].id));
        }

        HtmlToXlsxCreator(
            sheets,
            sheetNames,
            "relacion-descriptores.xlsx",
            "Excel"
        );
    };
};

async function relationshipCounter(descriptorList, relations) {
    return new Promise((resolve, reject) => {
        const counter = [];

        for (const descriptor of descriptorList) {
            const desciptorsRelationship = relations[descriptor];

            for (let relatedDescription of desciptorsRelationship) {
                const key = `${descriptor}&${relatedDescription}`;
                const alternativeKey = `${relatedDescription}&${descriptor}`;
                const countedDescriptor = counter[key];
                const countedAlternativeKey = counter[alternativeKey];

                if (countedDescriptor) {
                    counter[key].weight++;
                } else if (countedAlternativeKey) {
                    counter[alternativeKey].weight++;
                } else {
                    counter[key] = {
                        source: descriptor,
                        target: relatedDescription,
                        weight: 0,
                        label: "Relación Descriptores",
                        type: "Undirected",
                    };
                }
            }
        }

        resolve(counter);
    });
}

function createDescriptorList(sheet) {
    const ORDER_FUNCTION = function(a, b) {
        return a.localeCompare(b);
    };
    const uniqueSet = new Set();
    sheet.forEach((row) => {
        Object.keys(row).forEach((col) => {
            const value = row[col];
            uniqueSet.add(getDebugDescriptors(value));
        });
    });

    // return Array.from(uniqueSet).sort(ORDER_FUNCTION);
    const orderedDescriptorList = Array.from(uniqueSet).sort(ORDER_FUNCTION);
    const typifiedDescriptorList = [];
    let id = 1;
    for (const description of orderedDescriptorList) {
        typifiedDescriptorList[description] = id++;
    }

    return { orderedDescriptorList, typifiedDescriptorList };
}

function getDebugDescriptors(value) {
    let newValue = value.trim();
    return newValue.toLowerCase();
}

function createRelations(descriptorList, sheet) {
    const relations = [];
    for (const descriptor of descriptorList) {
        for (let row of sheet) {
            const relationship = getRowRelation(descriptor, row);
            if (relationship) {
                addRelation(relations, descriptor, relationship);
            }
        }
    }

    return relations;
}

function addRelation(relations, descriptor, relationship) {
    const value = relations[descriptor];
    if (value) {
        relations[descriptor] = [...relations[descriptor], ...relationship];
    } else {
        relations[descriptor] = relationship;
    }
}

function getRowRelation(descriptor, row) {
    let relations = [];
    let existRelation = false;
    Object.keys(row).forEach((col) => {
        const value = getDebugDescriptors(row[col]);
        if (value === descriptor) {
            existRelation = true;
        } else {
            relations.push(value);
        }
    });

    return existRelation ? relations : undefined;
}