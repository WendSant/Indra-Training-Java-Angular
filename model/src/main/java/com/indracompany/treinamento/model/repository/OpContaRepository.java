package com.indracompany.treinamento.model.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;

public interface OpContaRepository extends GenericCrudRepository<OperacaoConta, Long> {

	List<OperacaoConta> findByConta(ContaBancaria conta);

	List<OperacaoConta> findByContaAndDataHoraBetween(@Param("conta") ContaBancaria conta,
			@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
}