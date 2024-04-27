import React from 'react'

const Bot = () => {
    const Style = {
        text: {
            margin: '2em',
            color: '#444141',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            fontWeight: 'bold'   
        },
        intext: {
            // fontWeight: 'normal',
            marginLeft: '2em',
            marginRight: '1 em',
            marginBottom: '1em' 
        }
    };

    return (
        <div style={Style.text}>
            <p>Unsantized Inputs found</p>

            <p>Attack Info: </p>
            <div style={Style.intext}>
            <p>Vulnerability Identified: <span style={{ fontWeight: "bold", color: "red" }}>SQL Injection</span></p>
            </div>
            <p>Description:</p>
            <div style={Style.intext}>
                <p>SQL injection is a type of cyberattack where an attacker inserts or "injects" malicious SQL queries into an application's input data, enabling them to interfere with the database queries made by the application. This vulnerability allows attackers to manipulate the database, potentially accessing or modifying sensitive information.</p>
            </div>
            <p>How to prevent:</p>
            <div style={Style.intext}>
            <p>To fix SQL-Injection:</p>
    <ul>
        <li><span style={{ fontWeight: "bold" }}>Option 1: </span>Use of Prepared Statements</li>
        <li><span style={{ fontWeight: "bold" }}>Option 2: </span>Use of Properly Constructed Stored Procedures</li>
        <li><span style={{ fontWeight: "bold" }}>Option 3: </span>Allow-list Input Validation</li>
        <li><span style={{ fontWeight: "bold" }}>Option 4: </span>Escaping All User Supplied Input</li>
        </ul>
</div>
        </div >
    )
}

export default Bot