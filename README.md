# cutback-js
Cutback JS Library - For HTML5 Doubleclick Banners

Contact info
Juan Carlos Lara - skype: juanlaran
Gabriel Aguilar - skype: gab.webdesign

<h2>Banner Full HTML Layout</h2>

<div class="content">
                <pre class=" language-markup" data-src="code/index.html"><code class=" language-markup"><span class="token doctype">&lt;!DOCTYPE html&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Banner size<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>screen<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text/css<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>css/style.css<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>banner<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>frameOne<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Headline example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span>Small headline<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

  <span class="token script language-javascript"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>http://s0.2mdn.net/ads/studio/Enabler.js<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
  <span class="token script language-javascript"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span>'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.2/TweenMax.min.js'</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
  <span class="token script language-javascript"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>js/cutback.js<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
  <span class="token script language-javascript"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>js/banner.js<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span></code></pre>
            </div>

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
