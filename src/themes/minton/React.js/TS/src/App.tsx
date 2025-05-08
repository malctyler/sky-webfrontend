import AppWrapper from "./components/AppWrapper"
import AppRouter from "./routes/router"

import 'react-datepicker/dist/react-datepicker.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
// Themes
// For Icons
import '@/assets/scss/icons.scss';

// For Default import Default.scss
import '@/assets/scss/config/default/bootstrap.scss'
import '@/assets/scss/config/default/app.scss'
import configureFakeBackend from "./helpers/fake-backend";

// For Creative import Creative.scss
// import '@/assets/scss/config/creative/bootstrap.scss'
// import '@/assets/scss/config/creative/app.scss'

// For Modern import Modern.scss
// import '@/assets/scss/config/modern/bootstrap.scss'
// import '@/assets/scss/config/modern/app.scss'

// For Saas import Saas.scss
// import '@/assets/scss/config/saas/bootstrap.scss'
// import '@/assets/scss/config/saas/app.scss'

// For Material import Material.scss
// import '@/assets/scss/config/material/bootstrap.scss'
// import '@/assets/scss/config/material/app.scss'

// For Corporate import Corporate.scss
// import '@/assets/scss/config/corporate/bootstrap.scss'
// import '@/assets/scss/config/corporate/app.scss'
configureFakeBackend()
function App() {
    return (
        <>
            <AppWrapper>
                <AppRouter />
            </AppWrapper>
        </>
    )
}

export default App
