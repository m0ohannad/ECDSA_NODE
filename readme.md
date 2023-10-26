## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

https://github.com/m0ohannad/ECDSA_NODE/assets/47459778/df24f69d-436a-4b3a-b6c8-46a0686efef6

You can try these keys for testing purposes:
| Private Key                                                      	| Public Key                                                         	|
|------------------------------------------------------------------	|--------------------------------------------------------------------	|
| 7ab8b22f2e9fd64dfac3035ec531084b919bed797f201dfa3cdee4526168306f 	| 0391f67a6a86551e4675cea75cdfe32278ab5140f5d916f8d315f5a25bded1d5d4 	|
| 2e7bfd098784b3a8f45fdeb2f14f4e5ff5bbbfa073bbd9d3971b530d591d3923 	| 03d510a4e0422566776c8d415187b4ed8af9cd0eab7f0f3a88826eaee699ef154f 	|
| 207eb7b601d97ab2a93d2f7df21efa8a9d98342b87a2d2b4c307d3f902575393 	| 027e4b812d6e0393fd19245539942370e349f991535adbd77ae83fbb1d0729a32d 	|

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
