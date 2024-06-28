function Instructions() {
    return (
        <div>
            <h1>Reglas de juego PixelX</h1>

            <h2>1. Pre-partida</h2>
            <ol>
                <li>
                    Antes de cualquier cosa, se deben establecer la cantidad de turnos a jugar, de los cuales tendrán opciones fijas de cantidad de turnos.
            <ol type= "i">
                        <li>Partida Privada: El jugador creador escogerá la cantidad de turnos a jugar.</li>
                        <li>Partida Pública: Se jugarán 20 turnos ya determinados previamente.</li>
                    </ol>
                </li>
                <li>
                    Al entrar al juego al usuario es designado con una ficha de un color aleatorio y un monto de $1000 de dinero.
            <ol type= "i">

                        <li>Todos comenzarán la partida con una suma de dinero idéntica.</li>   
                    </ol>
                </li>
                <li>
                    Para decidir quién comienza, cada jugador lanza un dado y el valor más alto es el que comienza. En caso de empate, todos los jugadores vuelven a lanzar el dado.
            </li>
            </ol>

            <h2>2. Partida</h2>
            <h3>a. Casilla Partida</h3>
            <p>i. Todos los jugadores comienzan el juego en la casilla partida.</p>
            <p>ii. Cada vez que el jugador pasa por la casilla partida se le otorgara $100 de dinero.</p>
            <h3>b. Comprar Propiedades</h3>
            <p>i. Cada propiedad que compre un jugador vendrá con una casa.</p>
            <p>ii. Cada jugador al visitar una propiedad o servicio tendrá la opción de comprar una casa o tren extra dependiendo de la casilla.</p>
            <p>1. Solo se le permitirá comprar una propiedad o servicio si el jugador dispone suficiente dinero.</p>
            <p>iii. Si el jugador visita una casilla de su propiedad tendrá la opción de comprar casas o trenes dependiendo del tipo de propiedad.</p>
            <p>1. Solo se le permitirá comprar una casa o tren si el jugador dispone suficiente dinero.</p>
            <p>2. Solo se le permitirá comprar una casa más si tiene menos de 4, que es el máximo permitido.</p>
            <h3>c. Vender Propiedades</h3>
            <p>i. Si un jugador visita su propiedad, se le permitirá vender sus propiedades únicamente al banco.</p>
            <p>1. El valor de venta de la propiedad dependerá del número de casas construidas</p>
            <p>a. El valor de venta se calculará como la mitad aproximadamente del valor de compra de la propiedad.</p>
            <p>b. En el caso de los trenes, el valor de venta se calculará de la misma forma que el de las propiedades, independiente del valor de renta que el jugador pueda cobrar en ese momento.</p>
            <h3>d. Pagar renta</h3>
            <p>i. Cuando un jugador que visita una casilla que tiene otro dueño este tendrá que pagar una renta al dueño de la propiedad o servicio.</p>
            <p>1. El valor de renta de la propiedad o servicio dependerá del número de casas de la propiedad y será de aproximadamente, un cuarto del valor de compra original de los bienes.</p>
            <h3>e. Suerte</h3>
            <p>i. El juego contará con diversas tarjetas de “Suerte”, las cuales serán seleccionadas de manera aleatoria e influirán en el desarrollo del juego.</p>
            <p>ii. Tarjeta Multa: Los jugadores deberán pagar la cantidad de multa especificada en la tarjeta como penalización.</p>
            <p>1. Si el jugador no tiene fondos suficientes para pagar la multa, tendrá que vender propiedades o servicios, o si no será declarado en bancarrota, y perderá el juego.</p>
            <p>iii. Tarjeta Bonificación de dinero: Se otorgará al jugador una suma de dinero adicional, la cual estará especificada en la tarjeta.</p>
            <p>iv. Tarjeta Retroceso: La tarjeta mostrará el número de casillas que el jugador deba retroceder, alterando su avance en el tablero.</p>
            <p>v. Tarjeta Cárcel: La tarjeta permitirá al jugador salir de la Cárcel si cae en la casilla cárcel durante el juego. Se podrá utilizar una sola vez.</p>
            <p>vi. Tarjeta Bonus de avance: La tarjeta mostrará el número de casillas que el jugador deba avanzar, alterando su avance en el tablero.</p>
            <h3>f. Cárcel</h3>
            <p>i. Casilla Ir a cárcel: Esta casilla será la encargada de enviar el jugador directamente a la Cárcel. Perdiendo el turno.</p>
            <p>ii. Casilla Cárcel: Esta casilla representa la cárcel, donde el jugador perderá turnos a menos que pueda salir mediante alguna de las siguientes opciones:</p>
            <p>1. Sacar un valor de 1 o 6 en el dado.</p>
            <p>2. Pagar un monto “$100” especifico de dinero.</p>
            <p>3. Utilizar la tarjeta “Suerte” de la cárcel.</p>
            <h3>g. Impuestos</h3>
            <p>i. Al visitar esta casilla el jugador deberá pagar $150 monto en impuestos.</p>
            <p>1. Si el jugador no tiene fondos suficientes para pagar los impuestos, tendrá que vender propiedades o servicios, o si no será declarado en bancarrota, y perderá el juego.</p>
            <h3>h. Turnos</h3>
            <p>i. Dado</p>
            <p>1. En cada turno, cada jugador lanzará un dado el cual indicará la cantidad de casillas que se tendrá que mover.</p>
            <p>ii. Perdida de turno</p>
            <p>1. Los jugadores pueden perder su turno si se encuentran en la cárcel, y deciden no pagar la multa o no tienen la tarjeta de suerte “Cárcel”.</p>
            <p>2. Una vez en la cárcel si los jugadores no sacan un valor de 1 o 6 en el dado, no podrán avanzar las casillas obtenidas en el dado, por lo tanto, perdiendo su turno.</p>
            <h3>i. Visualización de información:</h3>
            <p>1. Dinero: Los jugadores no podrán ver la cantidad de dinero que tienen los otros jugadores.</p>
            <p>2. Propiedades y servicios: Los jugadores solo podrán ver las propiedades y servicios de los otros jugadores a través del tablero, donde en cada casilla mostrarán el número de casas o trenes que los jugadores posean en dicha casilla.</p>
            <p>3. Cartas de Suerte: Las cartas de suerte que pueden mantener los jugadores, como la carta suerte “Cárcel”, no se podrán observar por otros jugadores, hasta su utilización.</p>
            <h2>3. Termino de partida</h2>
            <h3>a. Quiebra: Si en algún momento el jugador se enfrenta a una deuda que ni, aunque vendiese todas sus propiedades pueda costear, se declara en bancarrota y sale de la partida, sus propiedades se volverán a vender para el resto de los jugadores restantes.</h3>
            <h3>b. Fin de Juego: Al cumplirse la cantidad de turnos definida al inicio de la partida, los jugadores que no hayan caído en bancarrota pasarán a comparar sus resultados financieros, donde se sumarán su dinero restante más la suma de su patrimonio y se compararán para determinar al ganador de la partida.</h3>
            <h3>c. Desconexión: Si un jugador se desconecta, se declara en bancarrota inmediatamente y los otros jugadores siguen jugando con normalidad, esto a menos que solo restasen dos jugadores, en ese caso, el jugador restante se declara automáticamente como ganador</h3>
        </div>
    )
}

export default Instructions;

