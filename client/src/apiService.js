const BASE_URL = "http://localhost:3000"; // URL בסיסי של השרת

export function confirmAction(message) {
    const userConfirmed = window.confirm(message);
    return userConfirmed; // מחזירה true אם המשתמש אישר, false אם ביטל
}

// שליפה מהשרת
export async function fetchData(apiPath) {
    try {
        const response = await fetch(`${BASE_URL}/${apiPath}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw (response.status);
        }
        return await response.json();
    }
    catch (error) {
        alert(`שגיאה בשליפה : ${error.message}`);
    }
}

//הוספה 
// export async function addData(apiPath, dataToAdd) {
//     try {
//         const response = await fetch(`${BASE_URL}/${apiPath}`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(dataToAdd),
//         });
//         if (!response.ok) {
//             throw (`שגיאה: ${response.status}`);
//         }
//     //  console.log("res",response,response.json());
//         return await response.json();
//     }
//     catch (error) {
//         alert(`שגיאה בהוספה : ${error.message}`);
//     }
// }


export async function addData(apiPath, dataToAdd) {
    try {
        const response = await fetch(`${BASE_URL}/${apiPath}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToAdd),
        });
        if (!response.ok) {
            throw new Error(`שגיאה ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        alert(`שגיאה בהוספה"  ${error.message}`);
    }
}
// מחיקה
export async function deleteData(apiPath) {
    try {
        const response = await fetch(`${BASE_URL}/${apiPath}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw (`שגיאה: ${response.status}`);
        }
    }
    catch (error) {
        alert(`שגיאה במחיקה: ${error.message}`);
    }
}

// עדכון
export async function UpdateData(apiPath, dataToUpdate) {
    try {
        const response = await fetch(`${BASE_URL}/${apiPath}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToUpdate),
        });
        if (!response.ok) {
            throw (`שגיאה: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        alert(`שגיאה בעדכון ${error.message}`);
    }
}