import express from 'express' ;
import { addBookmark,getBookmarks,removeBookmark } from '../controllers/bookmarkController.js';
const bookmarksRoutes = express.Router() ;

bookmarksRoutes.get('/:id/bookmarks',getBookmarks) ;
bookmarksRoutes.post('/:id/bookmarks',addBookmark)
bookmarksRoutes.delete('/:id/bookmarks',removeBookmark)

export default bookmarksRoutes