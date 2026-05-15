# CECOS University Admission Portal

Welcome to the **CECOS University Admission Portal**! This project is a modern, fast, and fully responsive frontend web application designed to streamline the student application and discovery process. It provides prospective students with an intuitive way to explore programs, review fee structures, learn about scholarships, and begin their admission journey.

## 🚀 Key Features

- **Dual-Language Support (English & Urdu)**: A fully integrated custom i18n solution that allows users to toggle seamlessly between English and Urdu across the entire site without page reloads.
- **Interactive Program Finder**: A step-by-step interactive quiz that helps prospective students find the right program based on their academic background and personal interests.
- **Comprehensive Fee Structure**: A built-in robust search and filtering system for viewing detailed semester-wise fee breakdowns for all undergraduate and postgraduate programs.
- **Dynamic Program Exploration**: Organized tabbed views separating Undergraduate and Postgraduate offerings, featuring more than 35+ diverse programs ranging from Engineering and Medical Sciences to Humanities and Business.
- **Beautiful & Modern UI**: Built with a focus on premium aesthetics using **TailwindCSS** and animated seamlessly with **Framer Motion**.
- **Responsive Design**: Carefully crafted to deliver a flawless user experience across desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📦 Getting Started

To get the project running locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/farzask/cecos-admission-portal.git
   cd cecos-admission-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the app**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

- `src/components/`: Contains all reusable UI components and page sections (e.g., `Hero`, `Programs`, `FeeStructure`, `Nav`).
- `src/pages/`: Contains the main route pages like `HomePage`, `FeesPage`, `TermsPage`, and `PrivacyPage`.
- `src/lib/`: Core utilities including:
  - `data.ts`: Centralized data store for all programs, fees, scholarships, and testimonials.
  - `i18n.tsx`: Custom hook and context for English/Urdu translations.
- `src/index.css`: Global styles and Tailwind directives.

## 📄 License

This project is proprietary to CECOS University.
