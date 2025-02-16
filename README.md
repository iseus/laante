# LAANTE

This project is a full-stack application built with Laravel 11 for the backend and Angular 17 for the frontend. It utilizes Docker and Laravel Sail for a seamless development experience.

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

### Backend

The `backend` directory contains the Laravel application, which includes:

- **app/**: Core application logic, including models, controllers, and middleware.
- **bootstrap/**: Files for bootstrapping the Laravel application.
- **config/**: Configuration files for various services and settings.
- **database/**: Database migrations, factories, and seeders.
- **public/**: Front controller and assets such as CSS and JavaScript files.
- **resources/**: Views, language files, and raw assets.
- **routes/**: Route definitions for the application.
- **storage/**: Used for logs, cache, and file uploads.
- **tests/**: Test cases for the application.
- **artisan**: Command-line interface for running various Laravel commands.
- **composer.json**: PHP dependencies for the Laravel application.
- **composer.lock**: Locks the versions of the dependencies.
- **Dockerfile**: Instructions for building the Docker image.
- **package.json**: JavaScript dependencies for the Laravel application.
- **phpunit.xml**: Configuration for PHPUnit.
- **sail/**: Files related to Laravel Sail.
- **server.php**: Entry point for the application.
- **webpack.mix.js**: Webpack build steps for the Laravel application.
- **.env**: Environment variables for the Laravel application.

### Frontend

The `frontend` directory contains the Angular application, which includes:

- **src/**: Source code for the Angular application.
  - **app/**: Main application module and components.
  - **assets/**: Static assets such as images and fonts.
  - **environments/**: Environment-specific configuration files.
  - **index.html**: Main HTML file for the Angular application.
  - **main.ts**: Entry point for the Angular application.
  - **polyfills.ts**: Polyfills needed for the Angular application.
  - **styles.css**: Global styles for the Angular application.
- **angular.json**: Configuration file for the Angular CLI.
- **package.json**: JavaScript dependencies for the Angular application.
- **tsconfig.app.json**: TypeScript configuration for the Angular application.
- **tsconfig.json**: Main TypeScript configuration file.
- **tsconfig.spec.json**: TypeScript configuration for testing.

### Docker

The `docker-compose.yml` file defines the services and configurations for Docker Compose, orchestrating the backend and frontend services.

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Run `docker-compose up` to start the application.
4. Access the application at `http://localhost`.

## Authentication

This project includes working authentication using Laravel's built-in features and Angular's routing capabilities. Ensure to configure the necessary environment variables in the `.env` file for the backend.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.