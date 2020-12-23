const moment = require("moment");

module.exports = (data) => {
  let fecha = new Date();

  return `

    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
                .invoice-box {
                    max-width: 800px;
                    margin: auto;
                    padding: 30px;
                    border: 1px solid #eee;
                    box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                    font-size: 6px;
                    line-height: 24px;
                    font-family: 'Helvetica Neue', 'Helvetica',
                    color: #555;
                }
                table
                {
                    background-color: white;
                    width: 100%;
                    text-align: left;
                    border-collapse: collapse;
                }

                th, td
                {
                    padding: -10px; 
                    font-size: 6px;
                    border: solid 1px black;
                }

                thead
                {
                    border-bottom: solid 1px grey;
                }
                .recuadrotexto
                {
                    margin-top: 2px;
                    width: 100%;
                    border: grey 1px solid;
                    border-collapse: collapse;
                    border-radius: 4%;
                }
                .firmaRepartidor
                {
                    margin-left: 30%;
                }
          </style>
       </head>
       <body>
          <div class="invoice-box">
            <div style="display: inline-block;">
                <img width="126px" height="46px" src="https://firebasestorage.googleapis.com/v0/b/cosbiome-bcdf4.appspot.com/o/logo-nuevo-solan-natura-editado.jpg?alt=media&token=47de15a4-7def-4c7c-a113-6df37a4bc4bc" alt="dasds"/>
            </div>
            <div  style="display: inline-block; margin-left: 10%;">
                <h2>Folio Ruta ${data.idRuta}</h2>
                Tipo de Movimiento: Venta
                Fecha Movimiento: ${moment().format("L")}
                Hora Movimiento: ${moment().format("LTS")}
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th> No. pedido </th>
                            <th> Producto </th>
                            <th> Cantidad </th>
                            <th> Total </th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.prodcutos.map((a, i) => {
                          // return "<tr>" + "<td>" + a + "</td>" + "<td>" + a + "</td>" + "<td>" + a + "</td>" + "</tr>"
                          return `
                                    <tr>
                                        <td> 
                                            ${a.data.idPedido} 
                                        </td>
                                        <td> 
                                            ${a.data.producto.map((b) => {
                                              return `
                                                        <span>
                                                            ${b.producto}-${b.cantidad}
                                                        </span>
                                                    `;
                                            })} 
                                        </td>
                                        <td> 
                                            ${
                                              a.data.producto.length > 1
                                                ? a.data.producto.reduce(
                                                    (c, d) =>
                                                      parseInt(c.cantidad) +
                                                      parseInt(d.cantidad)
                                                  )
                                                : a.data.producto[0].cantidad
                                            } 
                                        </td>
                                        <td> 
                                            ${a.data.total} 
                                        </td>
                                    </tr>
                                `;
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <div style="display: inline-block;">
                    <p>
                        <u>___________${
                          data.nombreAlmacen
                        }______________</u><br>
                        ENTREGO MERCANCIA
                    </p>
                </div>
                <div style="display: inline-block; margin-left: 50%;">
                    <p >
                        <u>__________________________________________</u><br>
                        RECIBO MERCANCIA
                    </p>
                </div>
            </div>
            <div className="recuadrotexto">
                <h1>PAGARÉ</h1>
                <p>
                    debo y pagare incodicionalmente por este pagare a la oden de ALEJANDRO ALVARADO GOMEZ a quien ha de pagarse, en el domicilio
                    HIDALGO 365 COLONIA SAN PEDRO TLAQUEPAQUE JALISCO, EL DIA <u>____________${moment()
                      .add(1, "day")
                      .format("L")}__________</u>, LA CANTIDAD DE
                    <u>__________${
                      data.total
                    }_________</u> (SON:<u>________<span>***${
    data.textoTotal
  } 00/100***</span>_____</u>), VALOR
                    RECIBIDO A MI ENTERA SATISFACCION.
                    Este pagare es mercantil y esta regido por la Ley General de Titulos y Operaciones de Crédito en su articulo 173 parte final
                    y demas articulos correlativos por no ser pagare domiciliado
                    De no verificarse el pago de la cantidad que este pagare expresa el dia de su vencimiento abonare el redito de 20% mensualmente,
                    por todo el tiempo que este insoluto sin perjuicio de cobro mas los gastos que por ello se originen.
                </p>
                <div style="display: inline-block;">
                    <p>
                        TLAQUEPAQUE JALISCO A:<u>_________${moment().format(
                          "L"
                        )}___________</u>.<br>
                        ISLAS BALTICAS 4425 1-22<br>
                        COL. SAUZ, GUADALAJARA, JALISCO<br>
                        C.P. TEL: 33670425<br>
                    </p>
                </div>
                <div class="firmaRepartidor" style="display: inline-block;">
                    <p >
                    <u>__________________________________________</u><br>
                        ${data.nombreRepartidor}
                    </p>
                </div>
            </div>
          </div>
       </body>
    </html>

    `;
};
