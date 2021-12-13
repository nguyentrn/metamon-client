/* eslint-disable react/prop-types */
import {
  Flex,
  Button,
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectMetamonSettings,
  setMetamonFilter,
  setMetamonSortBy,
  setSortBy,
} from "../../redux/marketSlice";

const NInput = forwardRef((props, ref) => {
  const metamonSettings = useSelector(selectMetamonSettings);

  return (
    <FormControl w="32">
      <FormLabel fontSize="xs" lineHeight="0.5">
        {props.label}
      </FormLabel>

      <NumberInput borderColor="blue.300">
        <NumberInputField
          placeholder={metamonSettings[props.atr]}
          type="number"
          {...props}
          ref={ref}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
});

const Settings = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const handleSortBy = (e) => {
    dispatch(
      selectedCategory === "metamon"
        ? setMetamonSortBy(e.target.value)
        : setSortBy(e.target.value)
    );
  };

  const onSubmit = async (data) => {
    dispatch(setMetamonFilter(data));
  };

  return (
    <Flex pb="4" px="4" w="100%" justify="space-between">
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="calc(100% - 12rem)"
        justify="space-around"
        align="flex-end"
      >
        {selectedCategory === "metamon" ? (
          <>
            <NInput
              label="Level từ"
              atr="level"
              {...register("level", {
                valueAsNumber: true,
              })}
            />
            <NInput
              label="Score từ"
              atr="score"
              {...register("score", {
                valueAsNumber: true,
              })}
            />
            <NInput
              label="Giá thấp hơn"
              atr="price"
              {...register("price", {
                valueAsNumber: true,
              })}
            />
            <Button type="submit" colorScheme="blue">
              Áp dụng
            </Button>
          </>
        ) : (
          ""
        )}
      </Flex>
      <FormControl id="email" w="12rem">
        <FormLabel fontSize="sm" lineHeight="0.5">
          Sắp xếp theo
        </FormLabel>
        <Select
          fontSize="sm"
          onChange={handleSortBy}
          defaultValue="createdAt"
          borderColor="blue.300"
        >
          <option value="createdAt">Thời gian đăng bán</option>
          <option value="price">Giá</option>
          {selectedCategory === "metamon" ? (
            <>
              <option value="level">Level</option>
              <option value="score">Score</option>
            </>
          ) : (
            ""
          )}
        </Select>
      </FormControl>
    </Flex>
  );
};

export default Settings;
