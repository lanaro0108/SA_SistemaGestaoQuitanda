// Importa as classes
import { QuitandaModel } from './Model/quitanda_model.js';
import { QuitandaView } from './View/quitanda_view.js';
import { QuitandaController } from './Controller/quitanda_controller.js';

// Instancia as peças
const appModel = new QuitandaModel();
const appView = new QuitandaView();
const appController = new QuitandaController(appModel, appView);

window.controller = appController;

// Inicializa os eventos
appController.init();