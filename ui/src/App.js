
import { Provider } from 'react-redux'

import Results from './Results.js'
import store from './flux/store'

const App = () => (
    <Provider store={store}>
        <Results />
    </Provider>
)

export default App