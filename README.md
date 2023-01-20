# DALL-E
DALL.E 2.0 Clone using MERN

### Client

Create react app using create-react-app
```shell
npx create-react-app client
```
#### Things to Provide

 1. assets folder
 2. utils folder (contains two functions)
    - Random Prompt Generation
    - Image download from URL
 3. constants folder
 4. Font family in the public folder of html file
    ```html
      <!-- Font Family -->
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    ```
5. Customization done in tailwind.config file
   ```js
   extend: {
    screens: {
      xs: '480px',
    },
    fontFamily: {
      inter: ['Inter var', 'sans-serif'],
    },
    boxShadow: {
      card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
      cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
    },
   },
   ```
6. Custom classes written in index.css file
   ```css
   * {
      font-family: 'Inter', sans-serif;
   }
    
   @media screen and (min-width: 480px) {
     .card:nth-child(7n + 1) {
         grid-column: auto/span 2;
         grid-row: auto/span 2;
     }
   }
    
   // customizing the scrollbar of card prompt 
   .prompt::-webkit-scrollbar {
     width: 5px;
   }
    
   .prompt::-webkit-scrollbar-thumb {
     background-color: #666e75;
     border-radius: 5px;
   }
   ```

#### Notes

1. In the below code, we're directly applying font family everywhere to avoid writing font-inter using tailwind css
   ```css
   * {
    font-family: 'Inter', sans-serif;
   }
   ```
2. In the code, the sm: lg: etc breakpoints are of min width. It means, any size above that breakpoint.
   ```html
    <div className="lg:grid-cols-4 sm:grid-cols-3"></div>
   ```
   It means, apply grid-cols-4 above any screen sizes of 1024px. Same for sm, any devices above 640px size. 
   Tailwind breakpoints are min-width queries by default. If we want to use max-width media query, we have to explicitly specifiy it:
   ```html
    <div className="max-lg:grid-cols-4"></div>
   ```
   This will acts as a max-width media query
3. To create that different layout, we're doing this:
   ```css
    @media screen and (min-width: 480px) {
      .card:nth-child(7n + 1) {
        grid-column: auto/span 2;
        grid-row: auto/span 2;
      }
    }
   ```
   This targets a sequence of (7n + 1) and gives that item an extra space, i.e, space of two columns and rows
   
   **"auto" and "span 2" in a grid refer to the sizing and layout of grid items. "auto" means that the grid item's size will be determined by its content, while "span 2" means that the grid item will take up two columns of the grid. This is used in CSS Grid Layout to specify how many columns a grid item should span across**
   
   The (7n + 1) will result in:
   * n = 0, 1st element
   * n = 1, 8th element
   ...

### Server

- Go to [OpenAI](https://beta.openai.com/account/api-keys), signup and create a secret key. Make sure to copy it as it'll be shown only once!
- Go to [MongoDB](https://www.mongodb.com/), signup and create a database. Make sure to copy the username and password
  ```bash
  mongodb+srv://jsmastery:<password>@cluster0.spe8tlt.mongodb.net/?retryWrites=true&w=majority
  ```
- Go to [Cloudinry](https://cloudinary.com/), signup and navigate to dashboard to get three keys
  ```bash
  CLOUDINARY_CLOUD_NAME=*****
  CLOUDINARY_API_KEY=******
  CLOUDINARY_API_SECRET=*****
  ```
- Use [Render](https://render.com/) for free server deployments
  - Create new account
  - Click on the New and select Web Service
  - Publish the repo to github
    * If repo is private:
      Connect your github account to Render
      Select the repo
    * If repo is public:
      Provide repo URL
      Mention the root folder of server, in this case it's 'server'
      Mention the command to run the server i.e., npm run server 
  - And deploy...


#### Notes 
- Each image can be returned as either a URL or Base64 data, using the response_format parameter by OpenAI. URLs will expire after an hour. [Guide](https://beta.openai.com/docs/guides/images/usage)
- The Render deployment will take some time for deployment. Later changes will be deployed automatically for each commit pushed to GitHub
- To upload images to Cloudinary, we have to install their [package](https://www.npmjs.com/package/cloudinary)
  ```bash
   npm i cloudinary
  ```
- In the current scenario, we're generating plenty of imges but uploading only one image to cloudinary to avoid uncessary generated images. While we're doing this, we are passing base64 data to client once user clicks on the generate function. And when user clicks on the share, we're passing this base64 data to another route that uploads the image to cloudinary and then saves it to MongoDB. 
  Becasue of this, we have to increase the limit of data that has to be passed in the request
  ```js
   app.use(express.json({ limit: '50mb' }));
  ```
