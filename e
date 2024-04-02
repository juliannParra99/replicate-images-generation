[33m2f70857[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mlanding[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m, [m[1;32mmain[m[33m)[m Added:1.9- Added 'other models' section and heroSection. V1.0, to improve some stuff
[33m02e0ece[m Added: 1.8- Added possibilitie to get an image between a default model or upload a new one: i can use an if to handle the logic better and show and use just one input dependending if the image was uploded
[33m2afdc6e[m Added: 1.7- fixing form and skeleton
[33m737223e[m Added 1.6- Updated the fetching, and the structure to get the data from the enpoint (cause changed). Allowed to get the image with the default image setted for the model
[33mb474afe[m Added: 1.5 - Added Navbar + Footer to landing page; Rest to fix some stuff related with form
[33me463f0c[m Added-: 1.4- Integration with Cloudinary to uploud your own images and then get a new one generated
[33m47f3737[m Added: 1.3.1- Logical separation between client and server to handle HTTP POST operations on the server for creating predictions with specific prompts for the model image, and on the client to fetch states and progressthrough HTTP GET requests to obtan the odel im image. This facilitates drawing data on the frontend. Atention: I must fix the Skeleton when I make a new promt, to make that the Skeleton replace the Image meanwhile we get the new one; otherwise the skeleton will show it under the curren image
[33m09a7975[m Added: 1.3 - Code refactoring + implement the results of 'u the results of 'use server' into 'use client' using useFormState
[33me989323[m Added: 1.2 -added integration of Replicate into our app
[33m3849d9b[m Added: 1.1- added server actions to handle the information sent by the form
[33m9f758c2[m Initial commit from Create Next App
