const headers={"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"POST, OPTIONS"};
exports.handler=async(event)=>{if(event.httpMethod==="OPTIONS")return{statusCode:204,headers,body:""};if(event.httpMethod!=="POST")return{statusCode:405,headers,body:JSON.stringify({error:"Method not allowed"})};
try{const body=JSON.parse(event.body||"{}"),messages=body.messages||[],images=body.images||[];if(!messages.length)throw Error("No messages supplied.");if(JSON.stringify(body).length>12_000_000)throw Error("Request is too large.");
let reply="";
if(process.env.GEMINI_API_KEY&&(images.length||body.provider==="gemini")){
 const model=process.env.GEMINI_MODEL||"gemini-2.5-flash";const sys=messages.find(m=>m.role==="system")?.content||"";const contents=messages.filter(m=>m.role!=="system").map(m=>({role:m.role==="assistant"?"model":"user",parts:[{text:m.content||""}]}));
 if(images.length){const last=contents[contents.length-1];for(const im of images.slice(0,4)){if(!im.data||!/^image\/(png|jpeg|webp|gif)$/.test(im.mimeType))continue;last.parts.push({inlineData:{mimeType:im.mimeType,data:im.data}})}}
 const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:sys}]},contents,generationConfig:{temperature:.7}})});
 const d=await r.json();if(!r.ok)throw Error(d.error?.message||"Gemini request failed");reply=(d.candidates?.[0]?.content?.parts||[]).map(p=>p.text||"").join("");
}else if(process.env.GROQ_API_KEY){
 let model=process.env.GROQ_MODEL||"llama-3.3-70b-versatile";let msgs=messages;
 if(images.length){model=process.env.GROQ_VISION_MODEL||"meta-llama/llama-4-scout-17b-16e-instruct";msgs=messages.map((m,i)=>i===messages.length-1?{...m,content:[{type:"text",text:m.content||"Please analyze this image."},...images.slice(0,4).map(im=>({type:"image_url",image_url:{url:`data:${im.mimeType};base64,${im.data}`}}))]}:m)}
 const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.GROQ_API_KEY},body:JSON.stringify({model,messages:msgs,temperature:.7})});const d=await r.json();if(!r.ok)throw Error(d.error?.message||"Groq request failed");reply=d.choices?.[0]?.message?.content||"";
}else throw Error("Backend is missing GEMINI_API_KEY or GROQ_API_KEY.");
return{statusCode:200,headers,body:JSON.stringify({reply})};
}catch(e){return{statusCode:500,headers,body:JSON.stringify({error:e.message||"Unexpected backend error"})}}};
