# Changelog

All notable changes to this project will be documented in this file.
Include any required SharePoint changes that will be needed to deploy you PR
Update the version number in package.json when submitting your PR

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [Unreleased]

- (Keep your changes here until you have a release version)

### Types of changes

- Added for new features.
- Changed for changes in existing functionality.
- Deprecated for soon-to-be removed features.
- Removed for now removed features.
- Fixed for any bug fixes.
- Security in case of vulnerabilities.

## [1.0.4] - 2025-09-11

### Changed

- Remove deprecated sendEmail api call -- replace with PowerAutomate triggered emails list
- Log is now semicolon separated string to be usable by the SendEmail_Child Power Automate flwo

## [1.0.3] - 2025-09-09

### Changed

- Updated the available Request Types
- Updated MCR Required for better UX -- Management Change Request (MCR)
- Added 'Mission Justification/Mission Impact/Personnel Impact for MCR' if MCR required is selected

## [1.0.2] - 2025-05-21

### Changed

- Update hardcoded emails to remove user

## [1.0.1] - 2025-05-07

### Changed

- Renamed "Reassignment" request type to "Management Reassignment"
- Require that if "Other" is selected as request type, that they must provide what it isected

## [1.0.0] - 2024-10-10

- Initial Release
