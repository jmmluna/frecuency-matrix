import xlsxParser from "xlsx-parse-json";
import "./style.css";

const relations = [];

document.getElementById("imputFile").onchange = async(evt) => {
    const files = Array.from(evt.target.files);
    const data = await xlsxParser.onFileSelection(files[0]);
    const sheetName = Object.keys(data)[0];
    const sheet = data[sheetName];
    const descriptorList = createDescriptorList(sheet);
    // console.log(descriptorSet.length);
    // for (let item of descriptorSet) console.log(item);
    const relations = createRelations(descriptorList, sheet);
    relationshipCounter(descriptorList, relations).then((counter) => {
        // alert(counter.length);
    });

    // const dowloadButton = document.getElementById("download");
    // dowloadButton.disabled = false;
    // dowloadButton.onclick = () => {
    //     alert(counter.length);
    // };
    // console.log(counter);
};

async function relationshipCounter(descriptorList, relations) {
    return new Promise((resolve, reject) => {
        const counter = [];

        for (const descriptor of descriptorList) {
            const desciptorsRelationship = relations[descriptor];
            // desciptorsRelationship.forEach((relatedDescription) => {
            for (let relatedDescription of desciptorsRelationship) {
                // console.log(`${descriptor} -> ${relatedDescription}`);
                const key = `${descriptor}&${relatedDescription}`;
                const alternativeKey = `${relatedDescription}&${descriptor}`;
                const countedDescriptor = counter[key];
                const countedAlternativeKey = counter[alternativeKey];

                if (countedDescriptor) {
                    counter[key].counter++;
                } else if (countedAlternativeKey) {
                    counter[alternativeKey].counter++;
                } else {
                    counter[key] = {
                        source: descriptor,
                        target: relatedDescription,
                        counter: 1,
                    };
                }
                // });
            }
        }

        // return counter;
        alert(counter.length);
        resolve(counter);
    });
}

function createDescriptorList(sheet) {
    const uniqueSet = new Set();
    sheet.forEach((row) => {
        Object.keys(row).forEach((col) => {
            const value = row[col];
            uniqueSet.add(getDebugDescriptors(value));
        });
    });

    return Array.from(uniqueSet).sort();
}

function getDebugDescriptors(value) {
    let newValue = value.trim();
    return newValue.toLowerCase();
}

function createRelations(descriptorList, sheet) {
    for (const descriptor of descriptorList) {
        sheet.forEach((row) => {
            const rowRelation = getRowRelation(descriptor, row);
            if (rowRelation) {
                // relations[descriptor] = rowRelation;
                addRelation(descriptor, rowRelation);
            }
        });
    }

    return relations;
}

function addRelation(descriptor, relationship) {
    const value = relations[descriptor];
    if (value)
        relations[descriptor] = [...relations[descriptor], ...relationship];
    else relations[descriptor] = relationship;
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