### MQTT Two Way Publisher and Subscriber process using JavaScript and Python Client

## First Create Virtual Environment for Client:
==> Open VS Code terminal and follow this command bellow:
```
python -m venv env
```
```
.\env\Scripts\activate
```
==> Install your library.
```
pip install paho-mqtt
```
==> Run Client Script
```
python client.py
```

### Server Installing Process:
1. For Node.js Server
   
   ==> Create npm env with library
```
npm install mqtt fs
```
   ==> Run the NodeJs server
```
node server_node_js.js
```

2. jQuery Server:

   ==> No need to install library again, if already installed
   
   ==> Run the Server
   ```
   <browser-name> jQuery.html
   ```
   ==> Or, just click F5 of the keyboard

4. Plain JavaScript Server:
   
   ==> No need to install library again, if already installed
   
   ==> Run the Server
   ```
   <browser-name> index.html
   ```
   ==> Or, just click F5 of the keyboard
