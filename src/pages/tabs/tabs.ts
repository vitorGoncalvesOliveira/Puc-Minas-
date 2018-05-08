import { Component } from '@angular/core';

import { ProjetosPage } from '../projetos/projetos'
import { TarefasPage } from '../tarefas/tarefas';
import { GrupoPage } from '../grupo/grupo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TarefasPage;
  tab2Root = ProjetosPage;
  tab3Root = GrupoPage;
  
  constructor() {

  }
}
