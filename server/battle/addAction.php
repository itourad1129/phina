<?php

class AddAction { //行動追加クラス

  public $type = -1; //行動者の参加者タイプ 0:プレイヤー 1:エネミー 2:NPC
  public $id = -1; //player_index_id,enemy_index_id,npc_index_idなど
  public $action = null; //生成されたアクション
  public $init = false;
  public $uniqueNo = -1;

  function __construct($uniqueNo,$type,$id,$isMove = 0,$movePos = null,$isUseCard = 0,$useCardId = -1,$isChangeDirection = 0,$changeDirection = -1){
    $this->type = $type;
    $this->id = $id;
    $this->uniqueNo = $uniqueNo;
    $this->action = new Action($isMove,$movePos,$isUseCard,$useCardId,$isChangeDirection,$changeDirection);
    if($this->action->init == true) $this->init = true;
  }

}
