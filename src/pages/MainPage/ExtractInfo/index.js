import nlp from 'compromise';
import React, {useState} from 'react';

const extractInfo = (transcription) => {
    // Implemente a lógica de extração de informações aqui
    // Este é um exemplo simples, ajuste conforme necessário
    const doc = nlp(transcription);
    const description = doc.text();
    const numerals = doc.values({ negatives: true }).toNumber().out('array');
    const value = numerals.length > 0 ? numerals[0] : 0;
    const words = transcription.split(' ');
    let action = '';

    const palavrasPerda = ['gastei', 'gasto', 'gastar', 'gastos', 'gastou', 'gastaram', 'gastando', 'gasta','perdi','comprei','compra','comprar','comprando','compraram','comprado','comprados','compradas','comprada','compras','perda','perder','perdendo','perderam','perderam','perderamos','perderão','perderia','perderiam','perderíamos','perder'];
    const palavrasLucro = ['ganhei','ganhe', 'ganho', 'ganhar', 'ganhou', 'ganhamos', 'ganham', 'ganha', 'ganharei', 'ganharão','lucrei','lucro','lucrar','lucrando','lucraram','lucrei','lucraria','lucrariam','lucraríamos','consegui','vendi','conquistei'];
    
  

    for (let i = 0; i < Math.min(words.length, 3); i++) {
      const palavraMinuscula = words[i].toLowerCase();
      if (palavrasLucro.includes(palavraMinuscula)) {
        // A primeira correspondência encontrada define a ação e interrompe o loop
        action = 'Lucro';
        break;
      }
      if (palavrasPerda.includes(palavraMinuscula)) {
        // A primeira correspondência encontrada define a ação e interrompe o loop
        action = 'Gasto';
        break;
      }
    
    }


    function hoje() {
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length === 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length === 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return anoF+"-"+mesF+"-"+diaF;
    }
    
    return {
      description: description,
      action: action,
      value: value,
      date: hoje(),
    };
  };
  
  export default extractInfo;