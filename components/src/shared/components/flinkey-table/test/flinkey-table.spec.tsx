import { FlinkeyTable } from '../flinkey-table';
import { h } from '@stencil/core';

describe('flinkey-table', () => {
  for (const testCase of [
    {
      type: 'boolean true',
      expectedVisibility: true,
      input: true,
    },
    {
      type: 'boolean false',
      expectedVisibility: false,
      input: false,
    },
    {
      type: 'arrow function returning boolean true',
      expectedVisibility: true,
      input: () => {
        return true;
      },
    },
    {
      type: 'arrow function returning boolean false',
      expectedVisibility: false,
      input: () => {
        return false;
      },
    },
  ]) {
    describe(`when calling getVisibility(...) with ${testCase.type}`, () => {
      it(`should return visibility ${testCase.expectedVisibility.toString()} as boolean`, () => {
        const button = new FlinkeyTable();
        const visibility = button.getVisibility(testCase.input);

        if (testCase.expectedVisibility) {
          expect(visibility).toBeTruthy();
        } else {
          expect(visibility).toBeFalsy();
        }
      });
    });
  }

  for (const testCase of [
    {
      column: {
        isVisible: true,
        label: '',
        field: 'id',
      },
      entry: {
        id: 21,
      },
      expectedValue: 21,
    },
    {
      column: {
        isVisible: true,
        label: '',
        field: 'id',
      },
      entry: {
        id: null,
      },
      expectedValue: '-',
    },
    {
      column: {
        isVisible: true,
        label: '',
        field: 'service.id',
      },
      entry: {
        service: { id: 32 },
      },
      expectedValue: 32,
    },
    {
      column: {
        isVisible: true,
        label: '',
        field: 'service.id',
      },
      entry: {
        service: { id: undefined },
      },
      expectedValue: '-',
    },
    {
      column: {
        isVisible: true,
        label: '',
        field: undefined,
      },
      entry: {
        service: { id: undefined },
      },
      expectedValue: undefined,
    },
    {
      column: {
        isVisible: true,
        label: '',
        field: undefined,
        cell: entry => <h1>{entry.id}</h1>,
      },
      entry: { id: 24 },
      expectedValue: <h1>24</h1>,
    },
  ]) {
    describe(`when calling getFieldValue(...) with ${JSON.stringify(testCase.column)} and ${JSON.stringify(testCase.entry)}`, () => {
      it(`should return value ${testCase.expectedValue}`, () => {
        const button = new FlinkeyTable();
        const value = button.getFieldValue(testCase.column, testCase.entry);

        expect(value).toEqual(testCase.expectedValue);
      });
    });
  }
});
