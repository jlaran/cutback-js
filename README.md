# cutback-js
Cutback JS Library - For HTML5 Doubleclick Banners

Contact info
Juan Carlos Lara - skype: juanlaran
Gabriel Aguilar - skype: gab.webdesign

<h2 class="main-subtitles">Banner Full HTML Layout</h2>

<div class="containerContent">
            <div class="content">
                <pre class=" language-markup" data-src="code/index.html"><code class=" language-markup"><span class="token doctype">&lt;!DOCTYPE html&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Banner size<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>width<span class="token punctuation">=</span>device-width, initial-scale<span class="token punctuation">=</span>1.0, maximum-scale<span class="token punctuation">=</span>1.0, user-scalable<span class="token punctuation">=</span>0<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>css/300x250.css<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>

        <span class="token comment" spellcheck="true">&lt;!-- Start your Banner here --&gt;</span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>banner<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>banner<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>collapse-banner<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Headline Example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span>Small headline<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

        <span class="token comment" spellcheck="true">&lt;!-- Finish your Banner here --&gt;</span>

        <span class="token script language-javascript"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>http://s0.2mdn.net/ads/studio/Enabler.js<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token script language-javascript"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.2/TweenMax.min.js<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token script language-javascript"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://cdn.jsdelivr.net/gh/jlaran/cutback-js@latest/cutback.min.js<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token script language-javascript"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>js/300x250.js<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>

        <span class="token comment" spellcheck="true">&lt;!-- &lt;script src="https://cdn.jsdelivr.net/gh/jlaran/cutback-js@latest/cutback-stats.min.js"&gt;&lt;/script&gt; --&gt;</span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span></code></pre>
            </div>
</div>


<h2 class="main-subtitles">Banner Initialize</h2>

<div class="containerContent">
            <div class="content">
				<pre data-src="code/script.js" class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> banner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Banner</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	type<span class="token punctuation">:</span> <span class="token string">"expand"</span><span class="token punctuation">,</span>
	expand<span class="token punctuation">:</span> <span class="token keyword">true</span><span class="token punctuation">,</span>
	finalExpandSize<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">320</span><span class="token punctuation">,</span><span class="token number">460</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	hotspotClose<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	hotspotExpand<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	timelinesName<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"firstTimeline"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	elementsToRegister<span class="token punctuation">:</span> <span class="token punctuation">[</span>
		<span class="token punctuation">{</span>eventType<span class="token punctuation">:</span> <span class="token string">"click"</span><span class="token punctuation">,</span> element<span class="token punctuation">:</span> <span class="token string">"#identifier"</span><span class="token punctuation">,</span> functionToCall<span class="token punctuation">:</span> <span class="token string">"function"</span><span class="token punctuation">}</span>
	<span class="token punctuation">]</span><span class="token punctuation">,</span>
	animationFrames<span class="token punctuation">:</span> <span class="token punctuation">[</span>
		<span class="token keyword">function</span> <span class="token function">firstFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">]</span><span class="token punctuation">,</span>
	timelinesAnimation<span class="token punctuation">:</span> <span class="token punctuation">{</span>
		register<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			timelinesArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">to</span><span class="token punctuation">(</span><span class="token string">"identifier"</span><span class="token punctuation">,</span> <span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>opacity<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		expandStartAnimation <span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		collapseStartAnimation<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment" spellcheck="true">//import "sharedFunctions.js"</span></code></pre>                
            </div>
        </div>

<h2 class="main-subtitles">Banner Parameters</h2>

<div class="containerContent">
            <div class="content">
                <h3>Let's look on list of all available parameters:</h3><br>
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
                            <th colspan="4">Initial Configuration</th>
                        </tr>
                        <tr>
                            <td>bannerType</td>
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
                        	<th colspan="4">Expanding Configuration</th>
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
                            	Tamaño final a expandir (en px), el array se compone de la siguiente forma: <br> <code class="notPrism">[Xposition, Yposition, expandedWidth, expandedHeight]</code>
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
								<code class="notPrism">[ <br>
                                &nbsp;&nbsp;&nbsp;&nbsp;{eventType: "click", element: "elementToSelect", functionToCall: "function"}<br>
                                ]</code>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="4">Timelines</th>
                        </tr>
                        <tr>
                            <td>timelinesName</td>
                            <td>array</td>
                            <td>[""]</td>
                            <td>
                                Contiene los nombres de cada timeline, este array esta formado por un conjunto de strings:
                                <code class="notPrism">["timelineOne"]</code>
                            </td>
                        </tr>
                        <tr>
                            <td>timelinesArray (only read)</td>
                            <td>array</td>
                            <td>[""]</td>
                            <td>
                                Contiene todos los timelines registrados en la función <code class="notPrism">register: function()</code> estos se pueden acceder por medio de <code class="notPrism">banner.timelinesArray[0]</code>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>timelinesToRegister</td>
                            <td>object</td>
                            <td>{function()}</td>
                            <td>
                            	Este objeto esta formado por un conjunto de funciones, en la función <code class="notPrism">register: function()</code>  se deben colocar todos los timelines completos para su registro inicial, la función <code class="notPrism">expandStartAnimation: function()</code> se ejecutará cuando se expanda el banner y la función <code class="notPrism">collapseStartAnimation: function()</code> se ejecutará cuando se colapse el banner, estas dos ultimas son opcionales si el banner es expand o no.
                                
								<code class="notPrism">
                                {<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;register: function(){<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timelinesArray[0].to("identifier1", 0.2, {opacity:1});<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timelinesArray[1].to("identifier2", 0.2, {left:150});<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timelinesArray[2].to("identifier3", 0.2, {top:100});<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;expandStartAnimation : function(){<br><br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;collapseStartAnimation: function(){<br><br>
                                &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                                }
                            	</code>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="4">Frames</th>
                        </tr>
                        <tr>
                            <td>animationFrames</td>
                            <td>array</td>
                            <td>[function()]</td>
                            <td>
                                Sección dedicada a las animación. Este array esta formado por un conjunto de funciones, la function <code class="notPrism">function firstFrame()</code> se ejecutará automáticamente. Estos frames se pueden acceder desde cualquier función llamando <code class="notPrism">banner.animationFrames[0]()</code><br>
                                <code class="notPrism">
                                [<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;function firstFrame(){ <br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//timeline call goes here <br>
                                &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                                ]
                                </code>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="4">Shared Functions</th>
                        </tr>
                        <tr>
                            <td>customFunctions</td>
                            <td>object</td>
                            <td>{ }</td>
                            <td>
                                En este objeto se colocarán todas las funciones que se compartan entre los banners, como por ejemplo: mapas, selects, busquedas, etc. Se puede acceder a estas funciones de la siguiente manera: <code class="notPrism">customFunctions.someFunction()</code><br>
                                <code class="notPrism">
                                var customFunctions = {<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;someFunction: function(){<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//Some function<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                                }
                                </code>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
