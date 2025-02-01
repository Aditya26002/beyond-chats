# Beyond Chats

Beyond Chats is a lead generation tool that allows you to integrate a free chatbot on your website, qualify your leads, and increase your sales.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/beyond_chats.git
   cd beyond_chats
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Structure

- `app/`: Contains the main application components and pages.
- `components/`: Contains reusable React components.
- `public/`: Contains static assets such as images and icons.
- `styles/`: Contains global styles and CSS files.

### Pages

- `app/page.tsx`: The main page that initially redirects to the registration page.
- `app/layout.tsx`: The root layout of the application.

### Components

- `UserRegistration.jsx`: Handles user registration.
- `SetupOrganisation.jsx`: Handles organization setup.
- `ChatbotIntegration.jsx`: Handles chatbot integration and testing.
- `ProgressBar.jsx`: Displays the progress of the multi-step form.

### Usage

1. **User Registration**: Users start by registering with their name, email, and password.
2. **Setup Organisation**: Users set up their organization by providing company details and scraping their website.
3. **Chatbot Integration**: Users integrate the chatbot into their website and test it.

### Live Demo

Check out the live demo of the project [here](https://beyond-chats-five.vercel.app/).

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
