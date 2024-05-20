import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Test = () => {
    const [fingerprintData, setFingerprintData] = useState(null);
    const [captureError, setCaptureError] = useState(null);

    const captureFingerprint = async () => {
        try {
            // Call the SDK/API method to capture fingerprint data
            const data = await fingerprintScanner.capture();
            setFingerprintData(data);
            setCaptureError(null);

            // Call a function to save the captured fingerprint data to the database
            saveFingerprintToDatabase(data);
        } catch (error) {
            console.error('Error capturing fingerprint:', error);
            setFingerprintData(null);
            setCaptureError('Error capturing fingerprint. Please try again.');
        }
    };

    const saveFingerprintToDatabase = (data) => {
        // Call an API endpoint to save the captured fingerprint data to the database
        // You'll need to implement this function based on your backend architecture
        // Example:
        // fetch('/api/saveFingerprint', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Failed to save fingerprint data');
        //     }
        // })
        // .catch(error => {
        //     console.error('Error saving fingerprint data:', error);
        // });
    };

    return (
        <div>
            <Button variant="contained" onClick={captureFingerprint}>Capture Fingerprint</Button>
            {fingerprintData && (
                <div>
                    <p>Fingerprint captured successfully!</p>
                    <pre>{JSON.stringify(fingerprintData, null, 2)}</pre>
                </div>
            )}
            {captureError && <p>{captureError}</p>}
        </div>
    );
};

export default Test;
