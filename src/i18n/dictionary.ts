export type Language = 'en-US' | 'es-419';

export const dictionary = {
  'en-US': {
    title: 'Marketing Math',
    subtitle: 'Learn contribution, break-even, and the impact of price and cost changes.',
    brand: 'Marketing Math',
    themeLight: 'Light',
    themeDark: 'Dark',
    langEn: 'EN',
    langEs: 'ES',
    madeWith: 'Made with ❤️ by',
    courseCredit: 'Strategic Marketing, MBA at',
    university: 'Universidad del CEMA',
    sections: {
      definitions: 'Definitions',
      product: 'Product',
      simulator: 'Simulator',
      chart: 'Break-even chart',
      comparison: 'Scenario comparison',
    },
    concepts: {
      fixedCosts: 'Fixed costs',
      fixedCostDef:
        'Fixed costs remain at a given level regardless of the amount of product produced and sold (for example, plant lease, salaried staff, or annual software licenses).',
      variableCosts: 'Variable costs',
      varCostDef:
        'Variable costs change depending on the amount of product produced and sold (for example, batteries, packaging, or payment processing fees per unit).',
      unitMargin: 'Unit margin (contribution)',
      marginDef:
        'Unit margin is the difference between the per-unit revenue the firm receives and the variable cost per unit. It is the contribution each unit makes toward covering fixed costs and profit.',
      marginFormula: 'Unit margin = Selling price − Variable cost per unit',
      percentMargin: 'Percent margin',
      marginPercentDef:
        'Percent margin divides unit margin by selling price (revenue), not by cost. A 20% margin means 20 cents of every revenue dollar is contribution.',
      marginPercentFormula: 'Margin % = (Unit margin ÷ Selling price) × 100',
      percentMarkup: 'Percent mark-up',
      markupDef:
        'Percent mark-up divides unit margin by variable cost. Margin and mark-up are not interchangeable: the same dollar margin yields a higher mark-up % than margin %.',
      markupFormula: 'Mark-up % = (Unit margin ÷ Variable cost) × 100',
      bev: 'Break-even volume (BEV)',
      bevDef:
        'Break-even volume is the number of units that must be sold to cover fixed costs exactly—zero profit, zero loss.',
      bevFormula: 'BEV = Fixed costs ÷ Unit margin',
      bevShare: 'Break-even market share',
      bevShareDef:
        'Break-even market share is the portion of the total market the firm must capture to reach break-even volume.',
      bevShareFormula: 'BEP share = BEV ÷ Market size',
      priceImpact: 'Impact of price and cost changes',
      priceImpactDef:
        'A small percentage price increase can raise unit margin sharply, creating a large allowable decrease in sales volume while still matching the previous total contribution. Cost cuts work the same way on margin.',
      allowableDeclineFormula:
        'Allowable volume decline % = (1 − Old margin ÷ New margin) × 100',
    },
    labels: {
      fixed: 'Fixed costs ($)',
      var: 'Variable cost per unit ($)',
      price: 'Selling price ($)',
      marketSize: 'Market size (units)',
      bev: 'Break-even volume',
      unitMargin: 'Unit margin',
      marginPct: 'Margin %',
      markupPct: 'Mark-up %',
      bevShare: 'BEP market share',
      volume: 'Volume (units)',
      revenue: 'Revenue',
      totalCost: 'Total cost',
      profit: 'Profit',
      baseline: 'Baseline',
      current: 'What-if',
      delta: 'Change',
      allowableDecline: 'Allowable volume decline',
      compareVolume: 'Compare profit at volume',
      baselineLocked: 'Locked baseline inputs',
    },
    product: {
      select: 'Active product',
      ebike: 'Urban e-bike',
      ebikeHint: 'R&D and warehouse lease, battery and frame cost, retail price.',
      new: 'New product',
      create: 'Create product',
      cancel: 'Cancel',
      name: 'Product name',
      delete: 'Delete',
      custom: 'Custom',
    },
    actions: {
      setBaseline: 'Lock current as baseline',
      setBaselineHint:
        'Change simulator inputs to compare against the locked baseline. Lock when this what-if should become your new reference (Change resets to zero).',
      resetToProduct: 'Reset to product defaults',
      apply: 'Apply',
    },
    chart: {
      revenue: 'Revenue',
      totalCost: 'Total cost',
      breakEven: 'Break-even',
      units: 'Units',
      dollars: 'Dollars',
    },
    comparison: {
      intro:
        'Baseline is a locked snapshot. What-if is whatever you set in the simulator. Edit price or costs above to create a difference—locking the baseline does not create one.',
      emptyState:
        'Baseline and what-if match right now. Change fixed costs, variable cost, selling price, or market size in the simulator to see deltas here.',
      compareVolumeHint:
        'This volume only recalculates the profit row under each scenario. Margin and break-even come from price and costs, not from this field.',
      noChange: 'Margins are equal or lower—there is no extra volume cushion from a margin gain.',
      declineCallout:
        'With the higher unit margin, volume can fall by up to {pct} and still deliver the same total contribution as the baseline.',
      needHigherMargin: 'Raise price or lower variable cost above the baseline margin to see allowable volume decline.',
    },
    empty: {
      noBev: 'Unit margin must be positive to calculate break-even.',
    },
  },
  'es-419': {
    title: 'Matemática de Marketing',
    subtitle: 'Aprende contribución, punto de equilibrio e impacto de cambios en precio y costos.',
    brand: 'Matemática de Marketing',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    langEn: 'EN',
    langEs: 'ES',
    madeWith: 'Hecho con ❤️ por',
    courseCredit: 'Marketing Estratégico, MBA en',
    university: 'Universidad del CEMA',
    sections: {
      definitions: 'Definiciones',
      product: 'Producto',
      simulator: 'Simulador',
      chart: 'Gráfico de equilibrio',
      comparison: 'Comparación de escenarios',
    },
    concepts: {
      fixedCosts: 'Costos fijos',
      fixedCostDef:
        'Los costos fijos se mantienen en un nivel determinado sin importar la cantidad de producto producido y vendido (por ejemplo, alquiler de planta, personal asalariado o licencias anuales de software).',
      variableCosts: 'Costos variables',
      varCostDef:
        'Los costos variables cambian según la cantidad de producto producido y vendido (por ejemplo, baterías, empaque o comisiones de pago por unidad).',
      unitMargin: 'Margen unitario (contribución)',
      marginDef:
        'El margen unitario es la diferencia entre el ingreso por unidad que recibe la empresa y el costo variable por unidad. Es la contribución de cada unidad para cubrir costos fijos y generar utilidad.',
      marginFormula: 'Margen unitario = Precio de venta − Costo variable unitario',
      percentMargin: 'Margen porcentual',
      marginPercentDef:
        'El margen porcentual divide el margen unitario por el precio de venta (ingreso), no por el costo. Un margen del 20% significa que 20 centavos de cada dólar de ingreso son contribución.',
      marginPercentFormula: 'Margen % = (Margen unitario ÷ Precio de venta) × 100',
      percentMarkup: 'Mark-up porcentual',
      markupDef:
        'El mark-up porcentual divide el margen unitario por el costo variable. Margen y mark-up no son intercambiables: el mismo margen en dólares produce un % de mark-up mayor que el % de margen.',
      markupFormula: 'Mark-up % = (Margen unitario ÷ Costo variable) × 100',
      bev: 'Volumen de equilibrio (BEV)',
      bevDef:
        'El volumen de equilibrio es el número de unidades que deben venderse para cubrir exactamente los costos fijos: utilidad cero, pérdida cero.',
      bevFormula: 'BEV = Costos fijos ÷ Margen unitario',
      bevShare: 'Participación de mercado de equilibrio',
      bevShareDef:
        'La participación de mercado de equilibrio es la porción del mercado total que la empresa debe capturar para alcanzar el volumen de equilibrio.',
      bevShareFormula: 'Participación BEP = BEV ÷ Tamaño de mercado',
      priceImpact: 'Impacto de cambios en precio y costos',
      priceImpactDef:
        'Un pequeño aumento porcentual en el precio puede elevar mucho el margen unitario, permitiendo una gran disminución aceptable en el volumen de ventas sin perder la contribución total previa. Recortar costos actúa igual sobre el margen.',
      allowableDeclineFormula:
        'Caída de volumen admisible % = (1 − Margen anterior ÷ Margen nuevo) × 100',
    },
    labels: {
      fixed: 'Costos fijos ($)',
      var: 'Costo variable unitario ($)',
      price: 'Precio de venta ($)',
      marketSize: 'Tamaño de mercado (unidades)',
      bev: 'Volumen de equilibrio',
      unitMargin: 'Margen unitario',
      marginPct: 'Margen %',
      markupPct: 'Mark-up %',
      bevShare: 'Participación BEP',
      volume: 'Volumen (unidades)',
      revenue: 'Ingresos',
      totalCost: 'Costo total',
      profit: 'Utilidad',
      baseline: 'Línea base',
      current: 'Simulación',
      delta: 'Cambio',
      allowableDecline: 'Caída de volumen admisible',
      compareVolume: 'Comparar utilidad en volumen',
      baselineLocked: 'Insumos de línea base (bloqueados)',
    },
    product: {
      select: 'Producto activo',
      ebike: 'Bicicleta eléctrica urbana',
      ebikeHint: 'I+D y alquiler de depósito, costo de batería y cuadro, precio minorista.',
      new: 'Nuevo producto',
      create: 'Crear producto',
      cancel: 'Cancelar',
      name: 'Nombre del producto',
      delete: 'Eliminar',
      custom: 'Personalizado',
    },
    actions: {
      setBaseline: 'Fijar actual como línea base',
      setBaselineHint:
        'Cambia los insumos del simulador para comparar contra la línea base bloqueada. Fíjala cuando esta simulación deba ser tu nueva referencia (el Cambio vuelve a cero).',
      resetToProduct: 'Restablecer valores del producto',
      apply: 'Aplicar',
    },
    chart: {
      revenue: 'Ingresos',
      totalCost: 'Costo total',
      breakEven: 'Equilibrio',
      units: 'Unidades',
      dollars: 'Dólares',
    },
    comparison: {
      intro:
        'La línea base es una instantánea bloqueada. La simulación es lo que configures en el simulador. Edita precio o costos arriba para crear una diferencia: fijar la línea base no la crea.',
      emptyState:
        'La línea base y la simulación coinciden ahora. Cambia costos fijos, costo variable, precio de venta o tamaño de mercado en el simulador para ver diferencias aquí.',
      compareVolumeHint:
        'Este volumen solo recalcula la fila de utilidad en cada escenario. El margen y el equilibrio dependen del precio y los costos, no de este campo.',
      noChange: 'Los márgenes son iguales o menores: no hay colchón extra de volumen por una ganancia de margen.',
      declineCallout:
        'Con el margen unitario más alto, el volumen puede caer hasta {pct} y aun así entregar la misma contribución total que la línea base.',
      needHigherMargin:
        'Sube el precio o baja el costo variable por encima del margen base para ver la caída de volumen admisible.',
    },
    empty: {
      noBev: 'El margen unitario debe ser positivo para calcular el punto de equilibrio.',
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Language];
