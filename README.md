
# philosophiclaude


simple web application to read philosophy classics with claude.

### features
- e-reader/AI chat integration
- philaude reads page-by-page with user, offering light commentary and answering questions
- each book corresponds to a unique session with claude
- save reading history
- access books in library

### future features
- search funcitonality (for now just have a few recommendations)
- highlight and save lines, send specific lines to philaude
- expand reader functionality
- reader customization (e.g. font size, light/dark mode, line spacing, margins)
- have philaude make connections across books that user has read
- utilize an open book database to automatically populate library
- improve UI
- write a native reader, which should fix a lot of the current reader-chat communication issues
- support markdown in chat
- save chat history
- resize chat panel
- settings page to configure philaude's behavior for different experience levels
- add button to reset user reading history!!!!

### known bugs
- refreshing while reading a book temporarily makes library disappear, books wont load. can recover data by refreshing the homepage
- "friendlier claude" toggle not working as intended
- need to improve prompt to make claude's responses more consistent
- reading history does not update unless reader actually turns the page
- philaude sometimes thinks that the introduction/preface is the actual story. this is especially a problem with plato's works
