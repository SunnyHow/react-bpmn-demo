export default function CustomPaletteProvider(
  palette,
  create,
  elementFactory,
  handTool,
  globalConnect,
  translate
) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._handTool = handTool;
  this._globalConnect = globalConnect;
  this._translate = translate;

  palette.registerProvider(this);
}

CustomPaletteProvider.$inject = [
  "palette",
  "create",
  "elementFactory",
  "handTool",
  "globalConnect",
  "translate",
];

CustomPaletteProvider.prototype.getPaletteEntries = function () {
  const translate = this._translate;
  const handTool = this._handTool;

  return {
    'hand-tool': {
        group: 'tools',
        className: 'bpmn-icon-hand-tool',
        title: translate('Hand Tool'),
        action: {
          click: function(event) {
            handTool.activateHand(event);
          }
        }
      },
    'tool-separator': {
        group: 'tools',
        separator: true
      },
    'create.start-event': {
      group: 'event',
      className: 'bpmn-icon-start-event-none',
      title: translate('Start Event'),
      action: {
        dragstart: this._createElement('bpmn:StartEvent'),
        click: this._createElement('bpmn:StartEvent')
      }
    },
    'create.end-event': {
      group: 'event',
      className: 'bpmn-icon-end-event-none',
      title: translate('End Event'),
      action: {
        dragstart: this._createElement('bpmn:EndEvent'),
        click: this._createElement('bpmn:EndEvent')
      }
    },
    'create.task': {
      group: 'activity',
      className: 'bpmn-icon-task',
      title: translate('Task'),
      action: {
        dragstart: this._createElement('bpmn:Task'),
        click: this._createElement('bpmn:Task')
      }
    },
    'create.parallel-gateway': {
      group: 'activity',
      className: 'bpmn-icon-gateway-parallel',
      title: translate('Parallel Gateway'),
      action: {
        dragstart: this._createElement('bpmn:ParallelGateway'),
        click: this._createElement('bpmn:ParallelGateway')
      }
    }
  };

};

CustomPaletteProvider.prototype._createElement = function(type) {
    const create = this._create;
    const elementFactory = this._elementFactory;
    
    return function(event) {
      const shape = elementFactory.createShape({ type: type });
      create.start(event, shape);
    };
  };