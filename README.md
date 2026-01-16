# RoomFinder

RoomFinder is a modern, responsive web application designed to simplify the process of finding and listing rental properties. Built with Next.js 15 and Supabase, it offers a seamless experience for both tenants and property owners.

## 🚀 Features

-   **Browse Listings**: View a grid of available rooms with key details like price, location, and type.
-   **Advanced Filtering**: Filter rooms by location, property type (1 BHK, PG, Villa, etc.), and tenant preference.
-   **Responsive Design**: optimized for mobile, tablet, and desktop devices.
-   **Authentication**: Secure user sign-up and login powered by Supabase Auth.
-   **Property Management**:
    -   **List a Room**: Owners can easily add new property listings with images.
    -   **Edit Listings**: Manage and update existing property details.
    -   **Delete Listings**: Remove properties that are no longer available.
-   **Contact Owners**: View contact details for properties directly on the listing card.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Backend & Auth**: [Supabase](https://supabase.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Image Storage**: Supabase Storage

## ⚙️ Getting Started

### Prerequisites

-   Node.js 18+ installed
-   A Supabase account

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/GhostRider9211/RoomFinder.git
    cd RoomFinder
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**

    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup:**

    Run the queries found in `supabase_setup.sql` in your Supabase SQL Editor to create the necessary tables, policies, and storage buckets.

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.
