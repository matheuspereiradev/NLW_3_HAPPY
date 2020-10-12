import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Landing from './pages/landing'
import Orfanatos from './pages/orphanagesMap'
//switch é pra mostarr so uma vez Browser route éo navegadpr e route uma rota
function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/orfanatos" component={Orfanatos}/>
            </Switch>
        </BrowserRouter>

    );
}

export default Routes;