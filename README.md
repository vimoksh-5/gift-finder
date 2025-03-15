# GiftFinder - Gift Ideas Website

A web application that helps users find gift ideas for various occasions. The application uses Google Sheets as a backend database and integrates with Google Forms for user submissions.

![GiftFinder Screenshot](https://source.unsplash.com/800x400/?gift)

## Features

- Browse gift ideas by occasion
- Filter gifts by recipient, price range, and more
- Sort gifts by rating or price (high to low or low to high)
- View detailed information about each gift including ratings
- Submit new gift ideas through a dedicated submission page
- Responsive design for all devices

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Routing**: React Router v6 with future flags enabled
- **Styling**: Styled Components for component-specific styling
- **API**: Axios for data fetching
- **Data Storage**: Google Sheets API
- **Form Submissions**: Google Forms
- **Build Tool**: Parcel

## Recent Updates

- Added sorting functionality (rating, price low to high, price high to low)
- Improved filtering system with dropdown menus
- Created a dedicated submission page for better user experience
- Fixed React Router warnings by implementing future flags
- Removed default underlines on hover for better UI
- Enhanced error handling and user feedback
- Improved mobile responsiveness

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- A Google account
- A Google Sheet set up for storing gift ideas
- A Google Form set up for collecting new gift ideas
- Google API key with access to the Google Sheets API

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd gifting
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Set up Google Sheets

1. Create a new Google Sheet with the following columns:

   - name
   - description
   - price
   - occasion
   - recipient (or for_whom)
   - category
   - image_url
   - purchase_link
   - rating (optional)

2. **Important: Make the sheet publicly accessible**

   - Click the "Share" button in the top right corner
   - Click "Change to anyone with the link"
   - Set the permission to "Viewer"
   - Click "Done"

3. Get the Sheet ID from the URL (the long string in the URL after `/spreadsheets/d/` and before `/edit`)

### Step 4: Set up Google API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API for your project
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API" and enable it
4. Create an API key
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API key"
5. Restrict the API key (optional but recommended)
   - Click on the newly created API key
   - Under "Application restrictions", choose "HTTP referrers"
   - Add your website domain or localhost for development
   - Under "API restrictions", select "Restrict key" and choose "Google Sheets API"
   - Click "Save"

### Step 5: Set up Google Form

1. Create a Google Form with fields matching your Google Sheet columns
2. Set the form to submit responses to your Google Sheet
3. Get the Form URL for embedding

### Step 6: Configure the application

1. Open `src/utils/googleSheetsApi.ts` and update:

   - `SHEET_ID` with your Google Sheet ID
   - `API_KEY` with your Google API key
   - Update the sheet name if needed (e.g., `Form responses 1`)

2. Open `src/pages/SubmissionPage.tsx` and update:
   - `formUrl` with your Google Form URL

### Step 7: Run the application

```bash
npm run dev
```

The application should now be running at http://localhost:1234

## Project Structure

```
gifting/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions and API
│   ├── App.tsx           # Main application component
│   ├── index.html        # HTML template
│   ├── index.tsx         # Application entry point
│   └── styles.css        # Global CSS
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Key Components

- **Header**: Navigation bar with links to all pages
- **GiftCard**: Displays individual gift information
- **GiftGrid**: Displays a grid of gift cards
- **OccasionCard**: Displays occasion categories
- **GoogleFormEmbed**: Embeds Google Form for submissions
- **Footer**: Contains site information and links

## Pages

- **HomePage**: Main page with filtering, sorting, and gift display
- **OccasionPage**: Shows gifts filtered by a specific occasion
- **SubmissionPage**: Dedicated page for submitting new gift ideas
- **AboutPage**: Information about the website
- **NotFoundPage**: 404 error page

## Troubleshooting

### API Permission Issues

If you see "The caller does not have permission" errors:

1. Make sure your Google Sheet is publicly accessible (see Step 3.2 above)
2. Verify your API key is correctly set up and has access to the Google Sheets API
3. Check that you're using the correct Sheet ID and sheet name in the API URL

### No Data Showing

If the application runs but no data appears:

1. Check the browser console for any error messages
2. Verify that your Google Sheet has the correct column headers
3. Make sure there is data in the sheet beyond the header row

### Styling Issues

If you encounter styling issues:

1. Check that all styled-components are properly imported
2. Verify that the global styles are being applied
3. Check for any CSS conflicts in the browser developer tools

## Deployment

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory and can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Customization

- Colors and styling can be modified in the styled-components definitions
- Global styles can be updated in `src/styles.css` and `src/styles/noUnderline.css`
- Add additional filters or categories as needed in the HomePage component

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Icons provided by emoji characters
- Design inspiration from various gift websites
- Built with React and modern web technologies
