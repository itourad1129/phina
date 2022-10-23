<?php

class BattleLog { //戦闘ログクラス

  public $battleLog = array(); //ログデータ
  public $battleInstanceId = -1; //バトルインスタンスID

  function __construct($battleInstanceId){
    $this->battleInstanceId = $battleInstanceId;
  }

  function AddAttackActionLog($list){ //攻撃アクションログ
    $logTYpe = 1; //攻撃アクションログ
    $result = array();
    $result['unique_no'] = isset($list['unique_no']) ? $list['unique_no'] : null;
    $result['log_type'] = isset($list['log_type']) ? $list['log_type'] : null;
    $result['turn'] = isset($list['turn']) ? $list['turn'] : null;
    $result['target_unique_no'] = isset($list['target_unique_no']) ? $list['target_unique_no'] : -1;
    $result['skill_name'] = isset($list['skill_name']) ? $list['skill_name'] : "";
    $result['hit_point'] = isset($list['hit_point']) ? $list['hit_point'] : 0;
    $result['miss'] = isset($list['miss']) ? $list['miss'] : 0;
    $result['critical'] = isset($list['critical']) ? $list['critical'] : 0;
    $result['kill'] = isset($list['kill']) ? $list['kill'] : 0;
    $result['max_hp'] = isset($list['max_hp']) ? $list['max_hp'] : 0;
    $result['prev_hp'] = isset($list['prev_hp']) ? $list['prev_hp'] : 0;
    $result['now_hp'] = isset($list['now_hp']) ? $list['now_hp'] : 0;
    $result['effect_image_id'] = isset($list['effect_image_id']) ? $list['effect_image_id'] : null;
    $result['back_attack'] = isset($list['back_attack']) ? $list['back_attack'] : null;
    $result['card_id'] = isset($list['card_id']) ? $list['card_id'] : -1;
    $result['target_pos_x'] = isset($list['target_pos_x']) ? $list['target_pos_x'] : -1;
    $result['target_pos_y'] = isset($list['target_pos_y']) ? $list['target_pos_y'] : -1;
    $result['my_pos_x'] = isset($list['my_pos_x']) ? $list['my_pos_x'] : -1;
    $result['my_pos_y'] = isset($list['my_pos_y']) ? $list['my_pos_y'] : -1;
    array_push($this->battleLog,$result);
  }

  function AddHealActionLog($list){ //回復アクションログ
    $logTYpe = 2; //回復アクションログ
    $result = array();
    $result['unique_no'] = isset($list['unique_no']) ? $list['unique_no'] : null;
    $result['log_type'] = isset($list['log_type']) ? $list['log_type'] : null;
    $result['turn'] = isset($list['turn']) ? $list['turn'] : null;
    $result['target_unique_no'] = isset($list['target_unique_no']) ? $list['target_unique_no'] : -1;
    $result['skill_name'] = isset($list['skill_name']) ? $list['skill_name'] : "";
    $result['hit_point'] = isset($list['hit_point']) ? $list['hit_point'] : 0;
    $result['miss'] = isset($list['miss']) ? $list['miss'] : 0;
    $result['critical'] = isset($list['critical']) ? $list['critical'] : 0;
    $result['kill'] = isset($list['kill']) ? $list['kill'] : 0;
    $result['max_hp'] = isset($list['max_hp']) ? $list['max_hp'] : 0;
    $result['prev_hp'] = isset($list['prev_hp']) ? $list['prev_hp'] : 0;
    $result['now_hp'] = isset($list['now_hp']) ? $list['now_hp'] : 0;
    $result['effect_image_id'] = isset($list['effect_image_id']) ? $list['effect_image_id'] : null;
    $result['card_id'] = isset($list['card_id']) ? $list['card_id'] : -1;
    $result['target_pos_x'] = isset($list['target_pos_x']) ? $list['target_pos_x'] : -1;
    $result['target_pos_y'] = isset($list['target_pos_y']) ? $list['target_pos_y'] : -1;
    $result['my_pos_x'] = isset($list['my_pos_x']) ? $list['my_pos_x'] : -1;
    $result['my_pos_y'] = isset($list['my_pos_y']) ? $list['my_pos_y'] : -1;
    array_push($this->battleLog,$result);
  }

  function AddBuffSetLog($list){ //バフ追加ログ
    $logTYpe = 3;
    $result = array();
    $result['unique_no'] = isset($list['unique_no']) ? $list['unique_no'] : null;
    $result['target_unique_no'] = isset($list['target_unique_no']) ? $list['target_unique_no'] : null;
    $result['log_type'] = isset($list['log_type']) ? $list['log_type'] : null;
    $result['turn'] = isset($list['turn']) ? $list['turn'] : null;
    $result['effect_image_id'] = isset($list['effect_image_id']) ? $list['effect_image_id'] : null;
    $result['card_id'] = isset($list['card_id']) ? $list['card_id'] : -1;
    $result['skill_name'] = isset($list['skill_name']) ? $list['skill_name'] : "";
    $result['target_pos_x'] = isset($list['target_pos_x']) ? $list['target_pos_x'] : -1;
    $result['target_pos_y'] = isset($list['target_pos_y']) ? $list['target_pos_y'] : -1;
    $result['my_pos_x'] = isset($list['my_pos_x']) ? $list['my_pos_x'] : -1;
    $result['my_pos_y'] = isset($list['my_pos_y']) ? $list['my_pos_y'] : -1;
    array_push($this->battleLog,$result);
  }

  function AddBuffExeLog($list){ //バフ定期実行ログ
    $logTYpe = 4;
    $result = array();
    $result['unique_no'] = isset($list['unique_no']) ? $list['unique_no'] : null;
    $result['target_unique_no'] = isset($list['target_unique_no']) ? $list['target_unique_no'] : null;
    $result['log_type'] = isset($list['log_type']) ? $list['log_type'] : null;
    $result['turn'] = isset($list['turn']) ? $list['turn'] : null;
    $result['buff_name'] = isset($list['buff_name']) ? $list['buff_name'] : "";
    $result['hit_point'] = isset($list['hit_point']) ? $list['hit_point'] : 0;
    $result['kill'] = isset($list['kill']) ? $list['kill'] : 0;
    $result['max_hp'] = isset($list['max_hp']) ? $list['max_hp'] : 0;
    $result['prev_hp'] = isset($list['prev_hp']) ? $list['prev_hp'] : 0;
    $result['now_hp'] = isset($list['now_hp']) ? $list['now_hp'] : 0;
    $result['update_status_type'] = isset($list['update_status_type']) ? $list['update_status_type'] : null;
    $result['effect_image_id'] = isset($list['effect_image_id']) ? $list['effect_image_id'] : null;
    $result['target_pos_x'] = isset($list['target_pos_x']) ? $list['target_pos_x'] : -1;
    $result['target_pos_y'] = isset($list['target_pos_y']) ? $list['target_pos_y'] : -1;
    $result['my_pos_x'] = isset($list['my_pos_x']) ? $list['my_pos_x'] : -1;
    $result['my_pos_y'] = isset($list['my_pos_y']) ? $list['my_pos_y'] : -1;
    array_push($this->battleLog,$result);
  }

  function AddActionMissLog($list){ //行動ミスログ
    $logTYpe = 5;
    $result['unique_no'] = isset($list['unique_no']) ? $list['unique_no'] : null;
    $result['target_unique_no'] = isset($list['target_unique_no']) ? $list['target_unique_no'] : null;
    $result['log_type'] = isset($list['log_type']) ? $list['log_type'] : null;
    $result['turn'] = isset($list['turn']) ? $list['turn'] : null;
    $result['card_id'] = isset($list['card_id']) ? $list['card_id'] : -1;
    $result['target_pos_x'] = isset($list['target_pos_x']) ? $list['target_pos_x'] : -1;
    $result['target_pos_y'] = isset($list['target_pos_y']) ? $list['target_pos_y'] : -1;
    $result['my_pos_x'] = isset($list['my_pos_x']) ? $list['my_pos_x'] : -1;
    $result['my_pos_y'] = isset($list['my_pos_y']) ? $list['my_pos_y'] : -1;
    array_push($this->battleLog,$result);
  }

  function AddGameResultLog($list){ //ゲーム結果ログ
    $logTYpe = 6;
    $result['effect_image_ids'] = isset($list['effect_image_ids']) ? $list['effect_image_ids'] : -1;
    $result['log_type'] = isset($list['log_type']) ? $list['log_type'] : null;
    $result['turn'] = isset($list['turn']) ? $list['turn'] : null;
    array_push($this->battleLog,$result);
  }

}
