# cutback-js
Cutback JS Library - For HTML5 Doubleclick Banners

Contact info
Juan Carlos Lara - skype: juanlaran
Gabriel Aguilar - skype: gab.webdesign

<table style="width:100%">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>string</td>
                            <td>"in-page"</td>
                            <td>Tipo de banner a realizar, puede ser <code class="notPrism">“in-app”</code> o <code class="notPrism">“in-page”</code></td>
                        </tr>
                        <tr>
                            <td>doubleClickTraking</td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Habilitar esta opción si se desea realizar tracking por medio de DoubleClick.</td>
                        </tr>
                        <tr>
                        	<th colspan="4">Expanding</th>
                        </tr>
                        <tr>
                            <td>expand</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Habilitar esta opción si se desea que el banner sea expandible, esta opción también habilita los eventos de Doubleclick <code class="notPrism">Enabler.requestExpand()</code> y <code class="notPrism">Enabler.requestCollapse()</code></td>
                        </tr>
                        <tr>
                            <td>finalExpandSize</td>
                            <td>array</td>
                            <td>[0,0,0,0]</td>
                            <td>
                            	Tamaño final a expandir (en px), el array se compone de la siguiente forma: <br/> <code class="notPrism">[Xposition, Yposition, expandedWidth, expandedHeight]</code>
                            	<div class="important-note">Si <code class="notPrism">expand: true</code> y <code class="notPrism">type: "in-page"</code> este parametro es requerido.</div>
                            </td>
                        </tr>
                        <tr>
                            <td>startExpanded</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Indica si el banner inicia en estado expandido o collapsado.</td>
                        </tr>
                        <tr>
                            <td>hotspotClose</td>
                            <td>array</td>
                            <td>[""]</td>
                            <td>
								Elemento a asignar el evento de <code class="notPrism">Enabler.requestCollapse()</code> que realiza el close del expandible. El array se compone de la siguiente forma: <code class="notPrism">["element", "event"]</code> El event por default es "click", en caso de que sea ese el deseado no es necesario colocarlo.
								<div class="important-note">Si <code class="notPrism">expand: true</code> y <code class="notPrism">type: "in-page"</code> este parametro es requerido.</div>
                            </td>
                        </tr>
                        <tr>
                            <td>hotspotExpand</td>
                            <td>array</td>
                            <td>[""]</td>
                            <td>
								Elemento a asignar el evento de <code class="notPrism">Enabler.requestExpand()</code> que realiza el expand del expandible.
								<div class="important-note">Si <code class="notPrism">expand: true</code> y <code class="notPrism">type: "in-page"</code> este parametro es requerido.</div>
                            </td>
                        </tr>
                        <tr>
                        	<th colspan="4">Functionality</th>
                        </tr>
                        <tr>
                            <td>elementsToRegister</td>
                            <td>array</td>
                            <td>[{}]</td>
                            <td>
                            	Registrado un evento determinado para un elemento, este array esta formado por un conjunto de objetos:
								<code class="notPrism">[{eventType: "click", element: "elementToSelect", functionToCall: "function"}]</code>
                            </td>
                        </tr>
                        <tr>
                            <td>animations</td>
                            <td>object</td>
                            <td>{function()}</td>
                            <td>
                            	Sección dedicada a las animación. Este array esta formado por un conjunto de funciones, la function firstFrame() se ejecutará automáticamente.
                            	<code class="notPrism">
                            	{function firstFrame(){
                            		//animation goes here
                            	}}
                            	</code>
                            </td>
                        </tr>
                        <tr>
                            <td>customFunctions</td>
                            <td>object</td>
                            <td>{function()}</td>
                            <td>
                            	Este array esta formado por un conjunto de funciones, en esta seccion se deben colocar todas aquellas funciones que sean externas a la animacion y al registro de eventos
								<code class="notPrism">
								{function customFunction(){
                            		//function goes here
                            	}}
                            	</code>
                            </td>
                        </tr>
                    </tbody>
                </table>
