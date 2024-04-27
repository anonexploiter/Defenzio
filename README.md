# Defenzio

**Welcome to Defenzio!**

Defenzio is a cutting-edge prototype designed to detect zero-day attacks using Deep-learning. It leverages the power of AI to identify and mitigate potential security threats in real-time.

## Prerequisites

Before getting started, ensure you have the following dependencies installed:

- [CICFlowmeter](https://github.com/ISCX/CICFlowMeter)
- [OpenAI](https://github.com/openai)
- [FastAPI](https://github.com/tiangolo/fastapi)
- [Uvicorn](https://www.uvicorn.org/)
- [MongoDB](https://www.mongodb.com/)

## Getting Started

To use Defenzio on your local machine, follow these simple steps:

1. Clone this repository to your machine.
2. Install all the prerequisites mentioned above.
3. Navigate to the "frontend" folder and run `npm start` to launch the frontend server.
4. In the "backend" folder, execute the command: `uvicorn mlapi_mail:app --port 8000` to start the backend server.
5. The backend will be up and running on port 8000.
6. Obtain your network logs using CICFlowmeter, or utilize the provided CSV files located in the "sample csvs" directory.
7. Click on the "choose file" button, select the CSV file, and hit the "Upload" button.
8. You'll receive the results along with a detailed ChatGPT response containing information about the detected attack type.

Feel free to explore Defenzio!

**Stay secure with Defenzio!**