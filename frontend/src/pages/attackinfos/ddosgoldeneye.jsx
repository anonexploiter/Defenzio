import React from 'react'

const Ddosgoldeneye = () => {
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
            <p>Zero-Day detected</p>

            <p>Attack Info</p>
            <div style={Style.intext}>
                <p>Vulnerability Identified: <span style={{ fontWeight: "bold", color: "red" }}>Zero-Day</span></p>
            </div>
            <p>Description:</p>
            <div style={Style.intext}>
                <p>In such scenarios, attackers gain an advantage as they leverage undisclosed vulnerabilities, allowing them to breach security defenses undetected, manipulate systems, and potentially extract sensitive data or cause other detrimental consequences.</p>
            </div>
            <p>How to prevent:</p>
            <div style={Style.intext}>
                <p> Data to be update soon.</p>
            </div>
        </div >
    )
}

export default Ddosgoldeneye