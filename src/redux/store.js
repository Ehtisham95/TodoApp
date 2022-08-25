import {configureStore} from '@reduxjs/toolkit';
import {todoSlice} from './home/todo-slice';
import {loginSlice} from './login/login-slice';

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    todoSlice: todoSlice.reducer,
  },
});

// 1. Add props (done)
// 2. Shift redux to a separate folder with respective file structure (done)
// 3. Follow the naming conventions (Done)
// 4. shift each component to its separate folder (done)
// 5. Change name of ui to screens (done)
// 6. Shift commons to a separate folder (done)
// 7. Run the app and check memo (done)
// 8. Check Combine reducers and the link shared (done)
// 9. Use forms library "https://react-hook-form.com/" (done)
// 10. Edit todo (done)
// 11. Add tab, Newly added tab, completed tab (done)
