# Social Media App

A fully responsive social media application built with Next.js, Redux, and TypeScript. This app allows users to view a post feed, search for posts, bookmark favorite posts, and view user profiles. It features a fake backend using JSON Server and is deployed on Vercel.

**You can access the app here: [Social Media App](https://a-sehriyaroglu-social-media-app.vercel.app/)**

## Features

- **Responsive Design**: Optimized for large, medium, and small devices.
- **Infinite Scrolling**: Load more posts as the user scrolls, improving performance and user experience.
- **Post Feed**: Displays posts in reverse chronological order, allowing users to view comments on each post.
- **Search Functionality**: Enables searching for posts within the feed, updating the displayed posts based on the search input.
- **Bookmarks**: Allows users to bookmark posts, with the data managed using Redux for persistent state management.
- **Profile Pages**: Displays the posts shared by individual users.
- **Explore Page**: (To be implemented) A section where users can search for posts by tags.
- **Post Management**: Users can like posts and add new posts, which are stored in the Redux state.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Redux Toolkit**: Manages global state for posts, bookmarks, and user profiles.
- **TypeScript**: Adds type safety to the codebase.
- **JSON Server**: Provides a mock backend API to simulate data interactions.
- **Vercel**: Deployment platform used to host the application.

## Future Enhancements

- **Explore Page**: Implement tag-based post searching.
- **Bookmarks Improvement**: Accurately track bookmarked posts in the dataset.
- **Post Creation**: Enable users to create new posts, which will be saved in Redux and reflected across the app.

