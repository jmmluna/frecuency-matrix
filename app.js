import xlsxParser from "xlsx-parse-json";
import './style.css';

document.getElementById("imputFile").onchange = async (evt) => {
    const files = Array.from(evt.target.files);
    
    const data = await xlsxParser.onFileSelection(files[0]);
    const sheet = data["Hoja1"];
    const uniqueSet = new Set();
    sheet.forEach((row) => {        
        Object.keys(row).forEach((col)=> {
            const value = row[col];
            uniqueSet.add(value.trim());
            // console.log(key + " " + value);
        });
    });

    console.log(uniqueSet.size);
    const orderedSet = Array.from(uniqueSet).sort();
    for (let item of orderedSet) console.log(item);

}