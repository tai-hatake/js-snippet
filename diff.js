const searchPath = (before, after) => {
    const maxLength = before.length + after.length;
    const path = [''];
    const posX = [0];
    const posY = [0];
    const map = Array(before.length * after.length);
    let p;
    for(let i=0; i < maxLength; i++){
      p = getPaht(before, after, posX, posY, path, map);
      if (p != null) break;
    }
    return getDiffList(before,after,path[p[0]]);
}

const getDiffList = (before, after, path) => {
    var afterRes = '';
    let pX = 0;
    let pY = 0;
    let pre = '';
    for(let i=0; i < path.length; i++){
      switch (path.charAt(i)) {
        case 'e':
          pX++;
          pY++;
          break;
        case 'a':
          if(pre!="a") pre="a";
          beforeRes +=  before.charAt(pX);
          pX++;
          break;
        case 'd':
          if(pre != "d"){
            pre="d";
            afterRes+=',';
          }
          afterRes+=after.charAt(pY);
          pY++;
          break;
      }
    }

    let extract = [];
    const beforeList = beforeRes.split(',')[j]
    const afterList = beforeRes.split(',')[j]
    for (let j in beforeList) {
      let key = beforeList[j];
      let val = afterList[j]
      extract.push({[key]: val});
    }
    return afterRes.split(',');
}

const delNode = (posX, posY, path, i) => {
  //すでに通った経路がある場合には現在のノードを削除する
  posX.splice(i,1);
  posY.splice(i,1);
  path.splice(i,1);
}

const getPaht = (before, after, posX, posY, path, map) => {
  var c = posX.length;//終端の個数
  var endPath = null;
  for(let i = 0; i < c; i++){//各終端について
    while(posX[i]!=before.length||posY[i]!=after.length){//編集回数が1増える（追加か削除を行う）か、比較し終えるまで繰り返す
      if(before.charAt(posX[i])==after.charAt(posY[i])){
        //同じ時は右下に進める
        if(map[(posX[i]+1)+(posY[i]+1)*(before.length+1)] == true) {
          delNode(posX, posY, path, i);
          i--;
          c--;
          break;
        } else {
          map[(posX[i]+1)+(posY[i]+1)*(before.length+1)] = true;
          posX[i]=posX[i]+1;
          posY[i]=posY[i]+1;
          path[i]=path[i]+"e";
        }
      } else {
        if(posX[i]==before.length){
          //右端なら分岐せずに下に進める
          if(map[(posX[i])+(posY[i]+1)*(before.length+1)] == true){
            delNode(posX, posY, path, i);
            i--;
            c--;
          }else{
            map[(posX[i])+(posY[i]+1)*(before.length+1)] = true;
            //posX[i]=posX[i];
            posY[i]=posY[i]+1;
            path[i]=path[i]+"d";
            i--;
          }
          break;
        } else if (posY[i]==after.length) {
          //下端なら分岐せずに右に進める
          if(map[(posX[i]+1)+(posY[i])*(before.length+1)] == true){
              delNode(posX, posY, path, i);
              i--;
              c--;
          } else {
            map[(posX[i]+1)+(posY[i])*(before.length+1)] = true;
            posX[i]=posX[i]+1;
            posY[i]=posY[i];
            path[i]=path[i]+"a";
          }
          break;
        } else {
          //同じでない場合は分岐させる（新規を右に）(元を下へ進める)
          if(map[(posX[i]+1)+(posY[i])*(before.length+1)] !=true){
            //すでに通った経路がある場合には新しく作らない
            map[(posX[i]+1)+(posY[i])*(before.length+1)]=true;
            posX[posX.length]=posX[i]+1;
            posY[posY.length]=posY[i];
            path[path.length]=path[i]+"a";
          }

          if(map[(posX[i])+(posY[i]+1)*(before.length+1)] == true){
              delNode(posX, posY, path, i);
              i--;
              c--;
          } else {
            map[(posX[i])+(posY[i]+1)*(before.length+1)] = true;
            //posX[i]=posX[i];
            posY[i]=posY[i]+1;
            path[i]=path[i]+"d";
          }
          break;
        }
      }
    }
    //もし右下まで着いた経路なら、記録しておく
    if(posX[i] == before.length && posY[i] == after.length) {
      if(endPath == null) endPath=[];
      endPath[endPath.length] = i;
    }
  }
  return endPath;
}
