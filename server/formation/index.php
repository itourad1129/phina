<?php

function getPlayerFormationDatas($conn,$playerIndexId){ //プレイヤーの所持している隊形を取得
  $result = array();
  $sql = "SELECT * FROM player_formation LEFT JOIN formation_master ON player_formation.formation_id = formation_master.id WHERE player_formation.player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getPlayerPartyFormationData($conn,$partyIndexId){ //現在のパーティに設定されている隊形データを取得
  $result = array();
  $sql = "SELECT * FROM player_party LEFT JOIN formation_master ON player_party.party_formation_id = formation_master.id WHERE player_party.leader_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($partyIndexId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getFormationMasterData($conn,$formationId){ //敵の隊形データの取得などに使用
  $sql = "SELECT * FROM formation_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($formationId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function updatePlayerPartyFormationData($conn,$partyIndexId,$newFormationId){ //隊形の変更を行う
  $sql = "UPDATE player_party SET party_formation_id=? WHERE leader_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($newFormationId,$partyIndexId));
}
