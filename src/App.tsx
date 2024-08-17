import { Lottery } from './components'
import { Toaster } from 'sonner'

const App = () => {
    return (
        <div className="App">
            <Lottery />
            <Toaster richColors />
        </div>
    )
}

export default App