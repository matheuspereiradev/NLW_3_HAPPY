import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Landing from './pages/landing'
import OrfanatosMap from './pages/orphanagesMap'
import CreateOrphanage from './pages/CreateOrphanage'
import Orphanage from './pages/Orphanage'
//switch é pra mostarr so uma vez Browser route éo navegadpr e route uma rota
function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/orfanatos/mapa" component={OrfanatosMap}/>
                <Route path="/orfanatos/cadastrar" component={CreateOrphanage}/>
                <Route path="/orfanatos/:id" component={Orphanage}/>
            </Switch>
        </BrowserRouter>

    );
}

export default Routes;